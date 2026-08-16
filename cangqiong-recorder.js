/**
 * 苍穹登录后控制台脚本：记录请求 + 操作，并自动拉扣分项（不必手动点党费页签）。
 *
 * 用法：刷新进入主控台后，F12 → Context 选顶层（苍穹云平台 / pc_main_console）→ 整份粘贴。
 * 右下角出现「扣分项行数」后再执行 __cqRec.copy()，不要一贴完就复制。
 *
 * 命令：
 *   window.__cqRec.help()
 *   window.__cqRec.copy()              复制记录（请求 + 点击 + 解析到的 pageId）
 *   window.__cqRec.download()          下载 cq-rec.json
 *   window.__cqRec.fetchDeduction()    点应用/党费/扣分项（走官方会话）并解析列表
 *   window.__cqRec.autoFetch = false   关掉登录后自动拉数
 *   window.__cqRec.stop()              停止记录
 */
(function () {
  var TAG = "[cq-rec]";
  if (window.__cqRec && window.__cqRec._alive) {
    console.warn(TAG + " 已在运行，先 __cqRec.stop() 再贴，或直接用现有命令");
    window.__cqRec.help();
    return window.__cqRec;
  }

  var MAX_LOG = 300;
  var MAX_BODY = 4000;
  var DEDUCTION = {
    consoleAppId: "bos",
    consoleForm: "pc_main_console",
    appTabKey: "tabap",
    appTabArg: "appbeta",
    myAppForm: "tenant_myapp",
    myAppControl: "bizcustomlistap",
    partyApp: {
      appnumber: "crrc_party_dues",
      appid: "5NBN/3EAL5OQ",
      alluserapp: "0",
      appname: "党费",
    },
    menuAppId: "crrc_party_dues",
    menuFormId: "crrc_party_dues_apphome",
    menuControl: "navigationbar",
    menuRoot: "root",
    menuItemId: "2524686743156851712",
    dataAppId: "crrc_dj",
    dataFormId: "crrc_deduction_log",
  };
  var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
  var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };

  var rec = {
    time: new Date().toISOString(),
    href: "",
    requests: [],
    ops: [],
    deductionRows: null,
    deductionError: null,
    autoFetch: true,
    _alive: true,
    _hooked: [],
  };

  function now() {
    return new Date().toISOString();
  }
  function clip(s, n) {
    s = s == null ? "" : String(s);
    return s.length > (n || MAX_BODY) ? s.slice(0, n || MAX_BODY) + "…[truncated]" : s;
  }
  function clipResponse(q, text) {
    var max = MAX_BODY;
    if (q && q.f === DEDUCTION.dataFormId && q.ac === "loadData") max = 800000;
    return clip(text, max);
  }
  function pushCapped(arr, item) {
    arr.push(item);
    if (arr.length > MAX_LOG) arr.splice(0, arr.length - MAX_LOG);
  }
  function parseQuery(url) {
    var out = {};
    try {
      var u = new URL(url, location.origin);
      u.searchParams.forEach(function (v, k) {
        out[k] = v;
      });
    } catch (e) {}
    return out;
  }
  function parseBody(raw) {
    var out = { raw: clip(raw, MAX_BODY), pageId: "", appId: "", params: null };
    if (raw == null) return out;
    var text = "";
    if (typeof raw === "string") text = raw;
    else if (raw instanceof URLSearchParams) text = raw.toString();
    else if (typeof raw === "object") {
      out.pageId = raw.pageId || "";
      out.appId = raw.appId || "";
      try {
        out.params = typeof raw.params === "string" ? JSON.parse(raw.params) : raw.params;
      } catch (e) {
        out.params = raw.params;
      }
      return out;
    } else return out;
    try {
      var sp = new URLSearchParams(text);
      out.pageId = sp.get("pageId") || "";
      out.appId = sp.get("appId") || "";
      var p = sp.get("params");
      if (p) {
        try {
          out.params = JSON.parse(p);
        } catch (e2) {
          out.params = p;
        }
      }
    } catch (e3) {}
    return out;
  }
  function extractRootSuffix(pageId) {
    var m = String(pageId || "").match(/root[a-f0-9]{16,}/i);
    return m ? m[0] : "";
  }
  function headerMap(headers) {
    var o = {};
    if (!headers) return o;
    try {
      if (typeof headers.forEach === "function") {
        headers.forEach(function (v, k) {
          o[k] = v;
        });
        return o;
      }
    } catch (e) {}
    if (typeof headers === "object") {
      Object.keys(headers).forEach(function (k) {
        o[k] = headers[k];
      });
    }
    return o;
  }

  function recordRequest(entry) {
    if (!rec._alive) return;
    entry.t = entry.t || now();
    pushCapped(rec.requests, entry);
    var q = entry.query || {};
    if (q.ac || entry.pageId) {
      console.log(
        TAG,
        q.ac || entry.method,
        q.f || "",
        "pageId=" + (entry.pageId || ""),
        entry.status != null ? "status=" + entry.status : "→"
      );
    }
    scheduleAutoFetch();
  }

  function recordOp(entry) {
    if (!rec._alive) return;
    entry.t = now();
    pushCapped(rec.ops, entry);
    console.log(TAG, "op", entry.type, entry.id || "", clip(entry.text, 40));
  }

  function finishRequest(matchFn, patch) {
    for (var i = rec.requests.length - 1; i >= 0; i--) {
      if (matchFn(rec.requests[i])) {
        Object.keys(patch).forEach(function (k) {
          rec.requests[i][k] = patch[k];
        });
        return;
      }
    }
  }

  function hookFetch(win) {
    if (!win.fetch || win.fetch.__cqRec) return;
    var orig = win.fetch.bind(win);
    function wrapped(input, init) {
      init = init || {};
      var url = typeof input === "string" ? input : input && input.url;
      var method = (init.method || "GET").toUpperCase();
      var q = parseQuery(url || "");
      var parsed = parseBody(init.body);
      var recId = rec.requests.length + "_" + Date.now();
      recordRequest({
        recId: recId,
        via: "fetch",
        method: method,
        url: clip(url, 500),
        query: q,
        pageId: parsed.pageId,
        appId: parsed.appId || q.appId || "",
        params: parsed.params,
        body: parsed.raw,
        headers: headerMap(init.headers),
      });
      return orig(input, init).then(function (res) {
        var clone = null;
        try {
          clone = res.clone();
        } catch (e) {}
        if (clone) {
          clone.text().then(function (text) {
            finishRequest(function (x) {
              return x.recId === recId;
            }, { status: res.status, response: clipResponse(q, text) });
          }).catch(function () {});
        } else {
          finishRequest(function (x) {
            return x.recId === recId;
          }, { status: res.status });
        }
        return res;
      });
    }
    wrapped.__cqRec = true;
    wrapped.__orig = orig;
    win.fetch = wrapped;
  }

  function hookXhr(win) {
    var XHR = win.XMLHttpRequest;
    if (!XHR || XHR.prototype.__cqRec) return;
    var open = XHR.prototype.open;
    var send = XHR.prototype.send;
    var setHeader = XHR.prototype.setRequestHeader;
    XHR.prototype.open = function (method, url) {
      this.__cqRecMeta = { method: String(method || "GET").toUpperCase(), url: String(url || ""), headers: {} };
      return open.apply(this, arguments);
    };
    XHR.prototype.setRequestHeader = function (k, v) {
      if (this.__cqRecMeta) this.__cqRecMeta.headers[k] = v;
      return setHeader.apply(this, arguments);
    };
    XHR.prototype.send = function (body) {
      var meta = this.__cqRecMeta || {};
      var q = parseQuery(meta.url || "");
      var parsed = parseBody(body);
      var recId = rec.requests.length + "_" + Date.now();
      var xhr = this;
      recordRequest({
        recId: recId,
        via: "xhr",
        method: meta.method,
        url: clip(meta.url, 500),
        query: q,
        pageId: parsed.pageId,
        appId: parsed.appId || q.appId || "",
        params: parsed.params,
        body: parsed.raw,
        headers: meta.headers || {},
      });
      xhr.addEventListener("loadend", function () {
        finishRequest(function (x) {
          return x.recId === recId;
        }, { status: xhr.status, response: clipResponse(q, xhr.responseText) });
      });
      return send.apply(this, arguments);
    };
    XHR.prototype.__cqRec = true;
  }

  function hookJq(win) {
    var jq = win.jQuery || win.$;
    if (!jq || !jq.ajaxPrefilter || jq.__cqRecPrefilter) return;
    jq.ajaxPrefilter(function (opts) {
      var url = opts.url || "";
      var q = parseQuery(url);
      var parsed = parseBody(opts.data);
      opts.__cqRecId = rec.requests.length + "_" + Date.now();
      recordRequest({
        recId: opts.__cqRecId,
        via: "jquery",
        method: String(opts.type || opts.method || "GET").toUpperCase(),
        url: clip(url, 500),
        query: q,
        pageId: parsed.pageId,
        appId: parsed.appId || q.appId || "",
        params: parsed.params,
        body: parsed.raw,
      });
    });
    if (jq.ajaxComplete && !jq.__cqRecComplete) {
      jq(win.document).ajaxComplete(function (ev, xhr, opts) {
        if (!opts || !opts.__cqRecId) return;
        finishRequest(
          function (x) {
            return x.recId === opts.__cqRecId;
          },
          {
            status: xhr && xhr.status,
            response: clipResponse(parseQuery(opts.url || ""), xhr && xhr.responseText),
          }
        );
      });
      jq.__cqRecComplete = true;
    }
    jq.__cqRecPrefilter = true;
  }

  function elText(el) {
    if (!el) return "";
    return clip((el.innerText || el.textContent || el.getAttribute("title") || "").replace(/\s+/g, " ").trim(), 80);
  }
  function elPath(el) {
    var parts = [];
    var cur = el;
    var n = 0;
    while (cur && cur.nodeType === 1 && n < 8) {
      var bit = cur.tagName.toLowerCase();
      if (cur.id) bit += "#" + cur.id;
      else if (cur.className && typeof cur.className === "string") {
        bit += "." + cur.className.trim().split(/\s+/).slice(0, 2).join(".");
      }
      parts.unshift(bit);
      cur = cur.parentElement;
      n++;
    }
    return parts.join(" > ");
  }
  function hookClicks(win) {
    var doc = win.document;
    if (!doc || doc.__cqRecClick) return;
    doc.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest && t.closest("#cq-rec-copy-panel")) return;
        var hit = t.closest("button, a, [role='tab'], .kd-cq-homepage-tab-item, .kd-cq-toolbar-item, .kd-cq-treemenu, li, span, div");
        var el = hit || t;
        recordOp({
          type: "click",
          id: el.id || "",
          cls: clip(el.className, 120),
          text: elText(el),
          path: elPath(el),
        });
      },
      true
    );
    doc.__cqRecClick = true;
  }

  function hookWin(win) {
    if (!win || !rec._alive) return;
    try {
      void win.location.href;
    } catch (e) {
      return;
    }
    if (win.__cqRecHooked) return;
    win.__cqRecHooked = true;
    rec._hooked.push(win);
    try {
      hookFetch(win);
      hookXhr(win);
      hookJq(win);
      hookClicks(win);
    } catch (e2) {
      console.warn(TAG + " hook 失败", e2 && e2.message);
    }
  }

  function walkHook(root) {
    hookWin(root);
    var seen = [];
    function walk(win, depth) {
      if (!win || depth > 8) return;
      for (var i = 0; i < seen.length; i++) if (seen[i] === win) return;
      seen.push(win);
      hookWin(win);
      try {
        var frames = win.frames;
        for (var f = 0; f < frames.length; f++) walk(frames[f], depth + 1);
      } catch (e) {}
    }
    walk(root, 0);
  }

  function collectPageIds() {
    var ids = [];
    rec.requests.forEach(function (r) {
      if (r.pageId) ids.push(r.pageId);
    });
    rec._hooked.forEach(function (win) {
      try {
        var u = new URL(win.location.href);
        var p = u.searchParams.get("pageId") || u.searchParams.get("byPageId");
        if (p) ids.push(p);
      } catch (e) {}
      try {
        var nodes = win.document.querySelectorAll("iframe[src]");
        for (var i = 0; i < nodes.length; i++) {
          var m = (nodes[i].src || "").match(/[?&]pageId=([^&]+)/i);
          if (m) ids.push(decodeURIComponent(m[1]));
        }
      } catch (e2) {}
    });
    return ids;
  }

  function isConsoleRootPageId(id) {
    return /^root[a-f0-9]{16,}$/i.test(String(id || ""));
  }

  function findConsolePageIdFromDom() {
    var nodes = [];
    try {
      nodes = document.querySelectorAll("[id^='root']");
    } catch (e) {
      return "";
    }
    for (var i = 0; i < nodes.length; i++) {
      if (isConsoleRootPageId(nodes[i].id)) return nodes[i].id;
    }
    return "";
  }

  function pickSuffix() {
    var consoleId = latestConsolePageId();
    if (consoleId) return extractRootSuffix(consoleId) || consoleId;
    var ids = collectPageIds();
    var i, suf;
    for (i = 0; i < ids.length; i++) {
      if (isConsoleRootPageId(ids[i])) return ids[i];
    }
    for (i = 0; i < ids.length; i++) {
      suf = extractRootSuffix(ids[i]);
      if (suf) return suf;
    }
    return "";
  }

  function latestConsolePageId() {
    var i, r, f;
    for (i = rec.requests.length - 1; i >= 0; i--) {
      r = rec.requests[i];
      f = (r.query && r.query.f) || "";
      if (r.pageId && f === DEDUCTION.consoleForm && isConsoleRootPageId(r.pageId)) return r.pageId;
    }
    for (i = rec.requests.length - 1; i >= 0; i--) {
      r = rec.requests[i];
      if (isConsoleRootPageId(r.pageId)) return r.pageId;
    }
    var fromDom = findConsolePageIdFromDom();
    if (fromDom) return fromDom;
    var ids = collectPageIds();
    for (i = 0; i < ids.length; i++) if (isConsoleRootPageId(ids[i])) return ids[i];
    return "";
  }

  function isGuidPageId(id) {
    return /^[a-f0-9]{32}$/i.test(String(id || ""));
  }

  function addUnique(arr, id) {
    if (!id || arr.indexOf(id) >= 0) return;
    arr.push(id);
  }

  function readFiber(el) {
    if (!el) return null;
    try {
      var keys = Object.keys(el);
      for (var i = 0; i < keys.length; i++) {
        if (
          keys[i].indexOf("__reactFiber") === 0 ||
          keys[i].indexOf("__reactInternalInstance") === 0 ||
          keys[i].indexOf("__reactContainer") === 0
        ) {
          return el[keys[i]];
        }
      }
    } catch (e) {}
    return null;
  }

  function pickPageIdFromObj(obj, hits, depth, seen) {
    if (!obj || typeof obj !== "object" || depth > 6) return;
    if (seen.indexOf(obj) >= 0) return;
    seen.push(obj);
    var fid = obj.formId || obj.formid || obj.formID || "";
    var pid = obj.pageId || obj.pageid || obj.PageId || "";
    if (pid && String(fid) === DEDUCTION.myAppForm) addUnique(hits, String(pid));
    if (depth >= 4) return;
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length && i < 20; i++) pickPageIdFromObj(obj[i], hits, depth + 1, seen);
      return;
    }
    var keys = Object.keys(obj);
    for (var k = 0; k < keys.length && k < 40; k++) {
      var key = keys[k];
      if (/formId|pageId|form|page/i.test(key)) pickPageIdFromObj(obj[key], hits, depth + 1, seen);
    }
  }

  function scanReactTenantIds(rootEl, hits) {
    var fiber = readFiber(rootEl);
    if (!fiber) return;
    var n = 0;
    function walk(node, depth) {
      if (!node || depth > 45 || n > 6000) return;
      n++;
      try {
        pickPageIdFromObj(node.memoizedProps, hits, 0, []);
        pickPageIdFromObj(node.pendingProps, hits, 0, []);
        pickPageIdFromObj(node.memoizedState, hits, 0, []);
      } catch (e) {}
      walk(node.child, depth + 1);
      walk(node.sibling, depth);
    }
    walk(fiber.stateNode && fiber.stateNode.current ? fiber.stateNode.current : fiber, 0);
  }

  function scanStorageTenantIds(store, hits) {
    if (!store) return;
    try {
      for (var i = 0; i < store.length; i++) {
        var k = store.key(i);
        var v = store.getItem(k) || "";
        if (String(k).indexOf(DEDUCTION.myAppForm) >= 0 && isGuidPageId(v)) addUnique(hits, v);
        if (v.indexOf(DEDUCTION.myAppForm) < 0 && String(k).indexOf("pageId") < 0) continue;
        var m = v.match(/[a-f0-9]{32}/gi) || [];
        if (v.indexOf(DEDUCTION.myAppForm) >= 0) {
          for (var j = 0; j < m.length; j++) addUnique(hits, m[j]);
        }
      }
    } catch (e) {}
  }

  function collectTenantCandidates() {
    var hits = [];
    var i, r, f, id;
    for (i = rec.requests.length - 1; i >= 0; i--) {
      r = rec.requests[i];
      f = (r.query && r.query.f) || "";
      if (f === DEDUCTION.myAppForm && r.pageId) addUnique(hits, r.pageId);
    }
    try {
      var iframes = document.querySelectorAll("iframe[src]");
      for (i = 0; i < iframes.length; i++) {
        var src = iframes[i].src || "";
        if (src.indexOf(DEDUCTION.myAppForm) >= 0) {
          var m = src.match(/[?&]pageId=([^&]+)/i);
          if (m) addUnique(hits, decodeURIComponent(m[1]));
        }
      }
    } catch (e) {}
    try {
      var attrNodes = document.querySelectorAll("[pageid], [data-pageid], [data-page-id], [formid], [data-formid]");
      for (i = 0; i < attrNodes.length; i++) {
        var el = attrNodes[i];
        var formAttr = el.getAttribute("formid") || el.getAttribute("data-formid") || "";
        var pageAttr = el.getAttribute("pageid") || el.getAttribute("data-pageid") || el.getAttribute("data-page-id") || "";
        if (formAttr === DEDUCTION.myAppForm && pageAttr) addUnique(hits, pageAttr);
      }
    } catch (e2) {}
    try {
      var named = document.querySelectorAll("[id]");
      for (i = 0; i < named.length && i < 8000; i++) {
        id = named[i].id;
        if (id && id.indexOf(DEDUCTION.myAppForm) >= 0) {
          var mm = id.match(/[a-f0-9]{32}/i);
          if (mm) addUnique(hits, mm[0]);
        }
      }
    } catch (e3) {}
    try {
      scanStorageTenantIds(window.sessionStorage, hits);
      scanStorageTenantIds(window.localStorage, hits);
    } catch (e4) {}
    try {
      var wkeys = Object.getOwnPropertyNames(window);
      for (i = 0; i < wkeys.length && i < 400; i++) {
        var val = null;
        try {
          val = window[wkeys[i]];
        } catch (e5) {
          continue;
        }
        if (!val || (typeof val !== "object" && typeof val !== "function")) continue;
        try {
          pickPageIdFromObj(val, hits, 0, []);
        } catch (e6) {}
      }
    } catch (e7) {}
    try {
      var roots = document.querySelectorAll("[id^='root'], #homepagetabap, #flexpanelap, #appbeta, #tabap");
      for (i = 0; i < roots.length; i++) scanReactTenantIds(roots[i], hits);
      if (document.body) scanReactTenantIds(document.body, hits);
      if (document.getElementById("root")) scanReactTenantIds(document.getElementById("root"), hits);
    } catch (e8) {}
    rec.tenantHits = hits.slice();
    return hits;
  }

  function collectGuidIdsNearAppTab() {
    var out = [];
    var sels = ["#homepagetabap", "#flexpanelap", "#appbeta", "[id^='root']"];
    for (var s = 0; s < sels.length; s++) {
      var nodes = [];
      try {
        nodes = document.querySelectorAll(sels[s]);
      } catch (e) {}
      for (var n = 0; n < nodes.length; n++) {
        var root = nodes[n];
        if (isGuidPageId(root.id)) addUnique(out, root.id);
        var kids = [];
        try {
          kids = root.querySelectorAll("[id]");
        } catch (e2) {}
        for (var i = 0; i < kids.length && i < 2000; i++) {
          if (isGuidPageId(kids[i].id)) addUnique(out, kids[i].id);
        }
      }
    }
    rec.guidIdsNearApp = out.slice(0, 20);
    return out;
  }

  function findTenantMyAppPageId() {
    var hits = collectTenantCandidates();
    return hits[0] || "";
  }

  function buildTenantTryList(consolePageId) {
    var list = [];
    function add(id, src) {
      if (!id) return;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return;
      list.push({ id: id, src: src });
    }
    var hits = collectTenantCandidates();
    for (var h = 0; h < hits.length; h++) add(hits[h], "scan");
    var guids = collectGuidIdsNearAppTab();
    for (var g = 0; g < guids.length && g < 8; g++) add(guids[g], "dom-guid");
    add(consolePageId, "console-fallback");
    rec.tenantTryList = list;
    return list;
  }

  function waitFor(fn, timeout, step) {
    var t0 = Date.now();
    return new Promise(function (resolve, reject) {
      function tick() {
        var v = fn();
        if (v) return resolve(v);
        if (Date.now() - t0 > (timeout || 8000)) return reject(new Error("等待超时: " + (fn.name || "条件")));
        setTimeout(tick, step || 250);
      }
      tick();
    });
  }

  function isTimeoutPayload(data) {
    var s = "";
    try {
      s = typeof data === "string" ? data : JSON.stringify(data);
    } catch (e) {
      s = String(data);
    }
    return /pagetimeout|会话超时/.test(s);
  }

  function cqCell(val) {
    if (val == null) return "";
    if (Array.isArray(val)) {
      if (val.length >= 2 && typeof val[1] === "number") return val[1];
      if (val.length >= 2 && val[1] != null && val[1] !== "") return val[1];
      if (val[0] != null) return val[0];
      return "";
    }
    return val;
  }

  function findBillListPack(payload) {
    var pack = null;
    walkObj(
      payload,
      function (obj) {
        if (obj && obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
      },
      0,
      []
    );
    return pack;
  }

  function mapDeductionPack(pack) {
    var idx = pack.dataindex || {};
    return (pack.rows || []).map(function (row) {
      function at(key) {
        return idx[key] != null ? cqCell(row[idx[key]]) : "";
      }
      var status = String(at("billstatus"));
      var dateVal = idx.crrc_datefield != null ? row[idx.crrc_datefield] : null;
      var year = "";
      if (Array.isArray(dateVal)) year = String(dateVal[0] || (dateVal[1] ? String(dateVal[1]).slice(0, 4) : "") || "");
      else if (dateVal) year = String(cqCell(dateVal)).slice(0, 4);
      var periodCode = String(at("crrc_radiooptgroupfield") || "");
      var score = at("crrc_decimalfield");
      return {
        code: String(at("billno") || ""),
        name: String(at("crrc_textfield") || ""),
        standard: String(at("crrc_textfield1") || ""),
        score: score === "" ? "" : Number(score),
        year: year,
        quarter: PERIOD_TEXT[periodCode] || periodCode,
        statusText: STATUS_TEXT[status] || status,
        org: String(at("crrc_basedatafield_name") || ""),
        dept: String(at("crrc_orgfield_name") || ""),
      };
    });
  }

  function jqAjax() {
    var jq = window.jQuery || window.$;
    if (jq && typeof jq.ajax === "function") return jq;
    return null;
  }

  function cqInvoke(appId, formId, action, pageId, params) {
    var url =
      location.origin +
      "/ierp/form/batchInvokeAction.do?appId=" +
      encodeURIComponent(appId) +
      "&f=" +
      encodeURIComponent(formId) +
      "&ac=" +
      encodeURIComponent(action);
    var payload = {
      pageId: pageId,
      appId: appId,
      params: JSON.stringify(params),
    };
    var jq = jqAjax();
    return new Promise(function (resolve, reject) {
      if (jq) {
        jq.ajax({
          url: url,
          type: "POST",
          data: payload,
          xhrFields: { withCredentials: true },
          headers: { ajax: "true", cqappid: appId },
          success: function (data) {
            if (isTimeoutPayload(data)) reject(new Error("表单会话超时"));
            else resolve(data);
          },
          error: function (xhr, status, err) {
            reject(new Error((status || "ajax") + " " + (err || "") + " " + clip(xhr && xhr.responseText, 300)));
          },
        });
        return;
      }
      fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
          ajax: "true",
          cqappid: appId,
        },
        body:
          "pageId=" +
          encodeURIComponent(pageId) +
          "&appId=" +
          encodeURIComponent(appId) +
          "&params=" +
          encodeURIComponent(JSON.stringify(params)),
      })
        .then(function (res) {
          return res.text().then(function (text) {
            if (!res.ok) throw new Error("HTTP " + res.status + " " + clip(text, 300));
            try {
              return JSON.parse(text);
            } catch (e) {
              return text;
            }
          });
        })
        .then(resolve, reject);
    });
  }

  function walkObj(obj, fn, depth, seen) {
    if (!obj || typeof obj !== "object" || depth > 12) return;
    if (seen.indexOf(obj) >= 0) return;
    seen.push(obj);
    fn(obj);
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length && i < 80; i++) walkObj(obj[i], fn, depth + 1, seen);
      return;
    }
    var keys = Object.keys(obj);
    for (var k = 0; k < keys.length && k < 100; k++) walkObj(obj[keys[k]], fn, depth + 1, seen);
  }

  function extractRows(payload) {
    var pack = findBillListPack(payload);
    if (pack) return mapDeductionPack(pack);
    if (typeof payload === "string") {
      try {
        pack = findBillListPack(JSON.parse(payload));
        if (pack) return mapDeductionPack(pack);
      } catch (e) {}
    }
    return [];
  }

  function waitMs(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function findClickTarget(text, selector) {
    var nodes = [];
    try {
      nodes = document.querySelectorAll(selector || "div, span, a, li, button");
    } catch (e) {
      return null;
    }
    var fallback = null;
    var best = null;
    var bestLen = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && (el.closest("#cq-rec-status") || el.closest("#cq-rec-copy-panel") || el.closest("#" + "shadcn-hello-inject-root"))) {
        continue;
      }
      var raw = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      if (raw !== text) continue;
      if (!fallback) fallback = el;
      var hidden = false;
      try {
        var st = window.getComputedStyle(el);
        hidden = st && (st.display === "none" || st.visibility === "hidden");
      } catch (e2) {}
      if (hidden) continue;
      if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;
      var len = (el.innerHTML || "").length;
      if (len < bestLen) {
        bestLen = len;
        best = el;
      }
    }
    return best || fallback;
  }

  function fireClick(el) {
    if (!el) return false;
    try {
      el.scrollIntoView({ block: "center", inline: "nearest" });
    } catch (e) {}
    try {
      var opts = { bubbles: true, cancelable: true, view: window };
      el.dispatchEvent(new MouseEvent("pointerdown", opts));
      el.dispatchEvent(new MouseEvent("mousedown", opts));
      el.dispatchEvent(new MouseEvent("pointerup", opts));
      el.dispatchEvent(new MouseEvent("mouseup", opts));
      el.dispatchEvent(new MouseEvent("click", opts));
    } catch (e2) {
      try {
        el.click();
      } catch (e3) {
        return false;
      }
    }
    return true;
  }

  function reqForm(r, formId, ac) {
    return r && r.query && r.query.f === formId && r.query.ac === ac;
  }

  function waitForReq(pred, timeout) {
    return waitFor(function () {
      for (var i = rec.requests.length - 1; i >= 0; i--) {
        if (pred(rec.requests[i])) return rec.requests[i];
      }
      return null;
    }, timeout || 15000, 200);
  }

  function clickAndWait(text, selector, desc) {
    var el = findClickTarget(text, selector);
    if (!el) throw new Error("找不到可点击的「" + text + "」");
    setStatus(desc || ("点击「" + text + "」"));
    fireClick(el);
    return el;
  }

  function setStatus(msg) {
    rec.status = msg || "";
    console.log(TAG, msg);
    var el = document.getElementById("cq-rec-status");
    if (!el) {
      el = document.createElement("div");
      el.id = "cq-rec-status";
      el.style.cssText =
        "position:fixed;right:12px;bottom:12px;z-index:2147483645;background:#111;color:#fff;padding:8px 12px;border-radius:8px;font:12px/1.4 sans-serif;max-width:420px;box-shadow:0 6px 20px rgba(0,0,0,.25);";
      try {
        document.body.appendChild(el);
      } catch (e) {
        return;
      }
    }
    el.textContent = "[cq-rec] " + rec.status;
  }

  var fetching = false;
  function fetchDeduction() {
    if (fetching) return fetching;
    rec.deductionError = null;
    var startedAt = Date.now();
    function afterStart(r) {
      if (!r || !r.t) return false;
      var ts = Date.parse(r.t);
      return !isNaN(ts) && ts >= startedAt - 300;
    }
    setStatus("开始拉扣分项：点应用 → 点党费 → 打开扣分项 → 读 loadData");
    fetching = Promise.resolve()
      .then(function () {
        var consolePageId = latestConsolePageId();
        var suffix = pickSuffix();
        if (!consolePageId || !suffix) {
          throw new Error("还没有主控台 pageId（root…）。等主控台加载完再执行 __cqRec.fetchDeduction()");
        }
        var menuPageId = DEDUCTION.menuAppId + suffix;
        var listPageId = DEDUCTION.menuItemId + suffix;
        rec.consolePageIdUsed = consolePageId;
        rec.menuPageIdUsed = menuPageId;
        rec.listPageIdUsed = listPageId;
        console.log(TAG, "consolePageId", consolePageId, "menuPageId", menuPageId, "listPageId", listPageId);

        function treeMenuThenLoad() {
          setStatus("请求 treeMenuClick → loadData");
          return cqInvoke(DEDUCTION.menuAppId, DEDUCTION.menuFormId, "treeMenuClick", menuPageId, [
            {
              key: DEDUCTION.menuControl,
              methodName: "treeMenuClick",
              args: [DEDUCTION.menuRoot, DEDUCTION.menuItemId],
              postData: [{}, []],
            },
          ]).then(function () {
            return cqInvoke(DEDUCTION.dataAppId, DEDUCTION.dataFormId, "loadData", listPageId, [
              { key: "", methodName: "loadData", args: [], postData: [] },
            ]);
          });
        }

        return Promise.resolve()
          .then(function () {
            if (findClickTarget("党费")) return;
            var appEl =
              findClickTarget("应用", ".kd-cq-homepage-tab-item-text") || findClickTarget("应用");
            if (!appEl) {
              return cqInvoke(DEDUCTION.consoleAppId, DEDUCTION.consoleForm, "selectTab", consolePageId, [
                {
                  key: DEDUCTION.appTabKey,
                  methodName: "selectTab",
                  args: [DEDUCTION.appTabArg],
                  postData: [{}, []],
                },
              ]).catch(function (e) {
                console.warn(TAG, "selectTab 失败", e && e.message);
              });
            }
            setStatus("点击「应用」");
            fireClick(appEl);
          })
          .then(function () {
            return waitFor(function () {
              return findClickTarget("党费");
            }, 12000, 250);
          })
          .then(function (partyEl) {
            setStatus("点击「党费」（走官方 showForm，建立会话）");
            fireClick(partyEl);
            return waitForReq(function (r) {
              return (
                afterStart(r) &&
                reqForm(r, DEDUCTION.menuFormId, "loadData") &&
                r.response &&
                r.response.length > 8 &&
                !isTimeoutPayload(r.response)
              );
            }, 15000).catch(function () {
              console.warn(TAG, "未捕获到党费首页 loadData，仍继续（官方点击可能已建会话）");
              return waitMs(1500);
            });
          })
          .then(function () {
            return waitMs(400);
          })
          .then(function () {
            var menuEl = findClickTarget("扣分项台账");
            if (menuEl) {
              setStatus("点击「扣分项台账」");
              fireClick(menuEl);
              return waitForReq(function (r) {
                return (
                  afterStart(r) &&
                  reqForm(r, DEDUCTION.dataFormId, "loadData") &&
                  r.response &&
                  r.response.length > 8 &&
                  !isTimeoutPayload(r.response)
                );
              }, 15000).catch(function () {
                console.warn(TAG, "点击扣分项后未等到列表 loadData，改请求链");
                return treeMenuThenLoad();
              });
            }
            return treeMenuThenLoad();
          });
      })
      .then(function (res) {
        var payload = res && res.response ? res.response : res;
        if (isTimeoutPayload(payload)) throw new Error("表单会话超时（列表页尚未建立）");
        var rows = extractRows(payload);
        if (!rows.length) {
          for (var i = rec.requests.length - 1; i >= 0; i--) {
            var r = rec.requests[i];
            if (reqForm(r, DEDUCTION.dataFormId, "loadData") && r.response && !isTimeoutPayload(r.response)) {
              rows = extractRows(r.response);
              payload = r.response;
              if (rows.length) break;
            }
          }
        }
        rec.deductionRows = rows;
        rec.deductionRawPreview = clip(typeof payload === "string" ? payload : JSON.stringify(payload), 2000);
        setStatus("扣分项行数 " + rows.length + (rows.length ? "，可 __cqRec.copy()" : "，未解析到行"));
        if (rows.length) console.table(rows.slice(0, 20));
        else console.log(TAG + " 未解析到 billlistap 行，预览", rec.deductionRawPreview);
        return rows;
      })
      .then(
        function (rows) {
          fetching = false;
          return rows;
        },
        function (err) {
          fetching = false;
          rec.deductionError = String(err && err.message ? err.message : err);
          setStatus("拉数失败：" + rec.deductionError);
        }
      );
    return fetching;
  }

  var autoTimer = null;
  var autoTried = false;
  function scheduleAutoFetch() {
    if (!rec.autoFetch || autoTried || fetching) return;
    if (!latestConsolePageId()) return;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function () {
      if (!rec.autoFetch || autoTried || fetching) return;
      autoTried = true;
      setStatus("开始自动拉扣分项");
      fetchDeduction();
    }, 800);
  }

  function snapshot() {
    try {
      rec.href = location.href;
    } catch (e) {}
    return {
      time: rec.time,
      href: rec.href,
      status: rec.status || "",
      fetching: !!fetching,
      autoTried: autoTried,
      autoFetch: rec.autoFetch,
      suffix: pickSuffix(),
      consolePageId: latestConsolePageId(),
      tenantPageId: rec.tenantPageId || findTenantMyAppPageId() || "",
      tenantHits: rec.tenantHits || collectTenantCandidates(),
      tenantTryList: rec.tenantTryList || [],
      guidIdsNearApp: rec.guidIdsNearApp || collectGuidIdsNearAppTab(),
      hookedWindowCount: rec._hooked.length,
      hasJQuery: !!(window.jQuery || window.$),
      requestCount: rec.requests.length,
      opCount: rec.ops.length,
      deductionError: rec.deductionError,
      deductionRowCount: rec.deductionRows ? rec.deductionRows.length : 0,
      deductionRows: rec.deductionRows,
      deductionRawPreview: rec.deductionRawPreview,
      note: fetching
        ? "仍在拉数，请等控制台出现「扣分项行数」或右下角状态变化后再 copy"
        : !rec.deductionRows && !rec.deductionError
          ? "尚未开始或尚未结束拉数。请等右下角状态，或执行 __cqRec.fetchDeduction()"
          : "",
      ops: rec.ops,
      requests: rec.requests.map(function (r) {
        var h = r.headers || {};
        return {
          t: r.t,
          via: r.via,
          method: r.method,
          url: r.url,
          query: r.query,
          pageId: r.pageId,
          appId: r.appId,
          params: r.params,
          body: r.body,
          status: r.status,
          response: r.response,
          headerKeys: Object.keys(h),
        };
      }),
    };
  }

  function showCopy(text, title) {
    var id = "cq-rec-copy-panel";
    var old = document.getElementById(id);
    if (old) old.remove();
    var wrap = document.createElement("div");
    wrap.id = id;
    wrap.style.cssText =
      "position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:24px;";
    wrap.innerHTML =
      '<div style="width:min(920px,100%);max-height:86vh;background:#fff;color:#111;border-radius:10px;display:flex;flex-direction:column;">' +
      '<div style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font:600 14px/1.4 sans-serif;">' +
      (title || "Ctrl+C 复制") +
      "</div>" +
      '<textarea readonly style="flex:1;min-height:360px;margin:12px 16px;padding:10px;font:12px/1.5 ui-monospace,Consolas,monospace;border:1px solid #d0d0d0;border-radius:6px;"></textarea>' +
      '<div style="padding:0 16px 14px;display:flex;gap:8px;justify-content:flex-end;">' +
      '<button type="button" data-act="close" style="height:32px;padding:0 12px;border:0;border-radius:6px;background:#c62828;color:#fff;cursor:pointer;">关闭</button>' +
      "</div></div>";
    wrap.querySelector("textarea").value = text;
    wrap.querySelector("[data-act=close]").onclick = function () {
      wrap.remove();
    };
    wrap.addEventListener("click", function (e) {
      if (e.target === wrap) wrap.remove();
    });
    document.body.appendChild(wrap);
    setTimeout(function () {
      wrap.querySelector("textarea").select();
    }, 0);
  }

  function stop() {
    rec._alive = false;
    rec.autoFetch = false;
    rec._hooked.forEach(function (win) {
      try {
        if (win.fetch && win.fetch.__orig) win.fetch = win.fetch.__orig;
      } catch (e) {}
    });
    if (window.__cqRec) window.__cqRec._alive = false;
    console.log(TAG + " 已停止记录（无法完整卸载 XHR/jQuery hook，刷新页面即可清除）");
  }

  function help() {
    console.log(
      [
        TAG + " 命令",
        "  __cqRec.copy()             复制请求/操作/扣分项解析结果",
        "  __cqRec.download()         下载 cq-rec.json",
        "  __cqRec.fetchDeduction()   点「应用/党费/扣分项」走官方会话，再解析 loadData",
        "  __cqRec.autoFetch = false  禁止登录后自动拉数",
        "  __cqRec.stop()             停止记录",
        "粘贴后请保持 Context 在顶层主控台。右下角出现「扣分项行数」后再 copy。",
      ].join("\n")
    );
  }

  var api = {
    help: help,
    fetchDeduction: fetchDeduction,
    copy: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      showCopy(json, "记录 JSON：文本框内 Ctrl+C");
      return json;
    },
    download: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "cq-rec.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    snapshot: snapshot,
    stop: stop,
    _alive: true,
  };
  Object.defineProperty(api, "autoFetch", {
    get: function () {
      return rec.autoFetch;
    },
    set: function (v) {
      rec.autoFetch = !!v;
    },
  });
  Object.defineProperty(api, "requests", {
    get: function () {
      return rec.requests;
    },
  });
  Object.defineProperty(api, "ops", {
    get: function () {
      return rec.ops;
    },
  });
  Object.defineProperty(api, "deductionRows", {
    get: function () {
      return rec.deductionRows;
    },
  });
  window.__cqRec = api;

  walkHook(window);
  setInterval(function () {
    if (rec._alive) walkHook(window);
  }, 2000);

  try {
    rec.href = location.href;
  } catch (e) {}
  setStatus("已挂钩。主控台 pageId 就绪后会自动拉扣分项，请勿立刻 copy");
  help();

  var bootTries = 0;
  function bootAuto() {
    if (!rec.autoFetch || autoTried || fetching) return;
    if (latestConsolePageId()) {
      scheduleAutoFetch();
      return;
    }
    bootTries += 1;
    if (bootTries < 40) setTimeout(bootAuto, 400);
    else setStatus("未找到主控台 pageId，请执行 __cqRec.fetchDeduction()");
  }
  bootAuto();
  return window.__cqRec;
})();
