/**
 * 苍穹登录后控制台脚本：记录请求 + 操作，并自动拉「季度党群绩效贡献度」。
 * 路径：应用 → 党费 → 季度党群绩效贡献度 → 逐张打开单据 → 同时读单据头和分录。
 * 列表页主要是单据头；贡献度等明细在分录里。结果里两样都保留。
 *
 * 用法：刷新进入主控台后，F12 → Context 选顶层（苍穹云平台 / pc_main_console）→ 整份粘贴。
 * 右下角出现「单据头…分录…」后再执行 __cqPqRec.copy()，不要一贴完就复制。
 *
 * 命令：
 *   window.__cqPqRec.help()
 *   window.__cqPqRec.copy()                   复制记录（单据头 + 分录）
 *   window.__cqPqRec.download()               下载 cq-pq-rec.json
 *   window.__cqPqRec.fetchPartyQuarterly()    点应用/党费/季度党群绩效贡献度，再逐张打开单据
 *   window.__cqPqRec.autoFetch = false        关掉登录后自动拉数
 *   window.__cqPqRec.stop()                   停止记录
 */
(function () {
  var TAG = "[cq-pq]";
  if (window.__cqPqRec && window.__cqPqRec._alive) {
    console.warn(TAG + " 已在运行，先 __cqPqRec.stop() 再贴，或直接用现有命令");
    window.__cqPqRec.help();
    return window.__cqPqRec;
  }

  var MAX_LOG = 800;
  var MAX_BODY = 4000;
  var TARGET = {
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
    menuItemId: "2546583953733611520",
    dataAppId: "",
    dataFormId: "",
    billAppId: "",
    billFormId: "",
    listControl: "billlistap",
    pkField: "",
    postcols: null,
    maxBills: 40,
    menuTexts: ["季度党群绩效贡献度", "季度党群绩效"],
  };
  var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
  var PERIOD_TEXT = { "1": "一季度", "2": "二季度", "3": "三季度", "4": "四季度", "5": "年度" };

  var rec = {
    time: new Date().toISOString(),
    href: "",
    requests: [],
    ops: [],
    partyRows: null,
    partyColumns: null,
    partyBills: null,
    partyListBills: null,
    partyListColumns: null,
    partyHeaderColumns: null,
    partyEntryColumns: null,
    partyError: null,
    entryErrors: [],
    discoveredFormId: "",
    discoveredAppId: "",
    discoveredBillFormId: "",
    discoveredBillAppId: "",
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
  function isReservedForm(formId) {
    return (
      formId === TARGET.menuFormId ||
      formId === TARGET.consoleForm ||
      formId === TARGET.myAppForm
    );
  }
  function clipResponse(q, text) {
    var max = MAX_BODY;
    if (q && q.ac === "loadData" && q.f && !isReservedForm(q.f)) max = 2000000;
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
    if (!win.fetch || win.fetch.__cqPqRec) return;
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
    wrapped.__cqPqRec = true;
    wrapped.__orig = orig;
    win.fetch = wrapped;
  }

  function hookXhr(win) {
    var XHR = win.XMLHttpRequest;
    if (!XHR || XHR.prototype.__cqPqRec) return;
    var open = XHR.prototype.open;
    var send = XHR.prototype.send;
    var setHeader = XHR.prototype.setRequestHeader;
    XHR.prototype.open = function (method, url) {
      this.__cqPqRecMeta = { method: String(method || "GET").toUpperCase(), url: String(url || ""), headers: {} };
      return open.apply(this, arguments);
    };
    XHR.prototype.setRequestHeader = function (k, v) {
      if (this.__cqPqRecMeta) this.__cqPqRecMeta.headers[k] = v;
      return setHeader.apply(this, arguments);
    };
    XHR.prototype.send = function (body) {
      var meta = this.__cqPqRecMeta || {};
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
    XHR.prototype.__cqPqRec = true;
  }

  function hookJq(win) {
    var jq = win.jQuery || win.$;
    if (!jq || !jq.ajaxPrefilter || jq.__cqPqRecPrefilter) return;
    jq.ajaxPrefilter(function (opts) {
      var url = opts.url || "";
      var q = parseQuery(url);
      var parsed = parseBody(opts.data);
      opts.__cqPqRecId = rec.requests.length + "_" + Date.now();
      recordRequest({
        recId: opts.__cqPqRecId,
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
    if (jq.ajaxComplete && !jq.__cqPqRecComplete) {
      jq(win.document).ajaxComplete(function (ev, xhr, opts) {
        if (!opts || !opts.__cqPqRecId) return;
        finishRequest(
          function (x) {
            return x.recId === opts.__cqPqRecId;
          },
          {
            status: xhr && xhr.status,
            response: clipResponse(parseQuery(opts.url || ""), xhr && xhr.responseText),
          }
        );
      });
      jq.__cqPqRecComplete = true;
    }
    jq.__cqPqRecPrefilter = true;
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
    if (!doc || doc.__cqPqRecClick) return;
    doc.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest && t.closest("#cq-pq-copy-panel")) return;
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
    doc.__cqPqRecClick = true;
  }

  function hookWin(win) {
    if (!win || !rec._alive) return;
    try {
      void win.location.href;
    } catch (e) {
      return;
    }
    if (win.__cqPqRecHooked) return;
    win.__cqPqRecHooked = true;
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
      if (r.pageId && f === TARGET.consoleForm && isConsoleRootPageId(r.pageId)) return r.pageId;
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
    if (pid && String(fid) === TARGET.myAppForm) addUnique(hits, String(pid));
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
        if (String(k).indexOf(TARGET.myAppForm) >= 0 && isGuidPageId(v)) addUnique(hits, v);
        if (v.indexOf(TARGET.myAppForm) < 0 && String(k).indexOf("pageId") < 0) continue;
        var m = v.match(/[a-f0-9]{32}/gi) || [];
        if (v.indexOf(TARGET.myAppForm) >= 0) {
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
      if (f === TARGET.myAppForm && r.pageId) addUnique(hits, r.pageId);
    }
    try {
      var iframes = document.querySelectorAll("iframe[src]");
      for (i = 0; i < iframes.length; i++) {
        var src = iframes[i].src || "";
        if (src.indexOf(TARGET.myAppForm) >= 0) {
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
        if (formAttr === TARGET.myAppForm && pageAttr) addUnique(hits, pageAttr);
      }
    } catch (e2) {}
    try {
      var named = document.querySelectorAll("[id]");
      for (i = 0; i < named.length && i < 8000; i++) {
        id = named[i].id;
        if (id && id.indexOf(TARGET.myAppForm) >= 0) {
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
        if (!obj || typeof obj !== "object") return;
        if (obj.k === "billlistap" && obj.data && Array.isArray(obj.data.rows)) pack = obj.data;
        else if (!pack && obj.c === "billlistap" && obj.p && Array.isArray(obj.p.rows)) pack = obj.p;
        else if (!pack && Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) pack = obj;
      },
      0,
      []
    );
    return pack;
  }

  function shouldSkipKey(key, idx, opts) {
    if (!key) return true;
    opts = opts || {};
    var low = String(key).toLowerCase();
    if (low === "rk" || low === "s" || low === "cprop") return true;
    if (!opts.keepSeq && (low === "fseq" || low === "seq")) return true;
    if (low === "rowkey" || low === "id") return true;
    if (key.length >= 3 && key.slice(key.length - 3) === "_id") return true;
    if (!opts.keepEntryKey && key.indexOf("entryentity") >= 0) return true;
    if (idx[key + "_name"] != null || idx[key + ".name"] != null) return true;
    return false;
  }

  function formatValue(key, raw) {
    if (raw == null || raw === "") return "";
    if (key === "billstatus" || key.indexOf("billstatus") >= 0) {
      var st = String(cqCell(raw));
      return STATUS_TEXT[st] || st;
    }
    if (key === "crrc_radiooptgroupfield" || key.indexOf("radioopt") >= 0) {
      var pd = String(cqCell(raw));
      return PERIOD_TEXT[pd] || pd;
    }
    if (key === "crrc_datefield" || key.indexOf("datefield") >= 0) {
      if (Array.isArray(raw)) {
        var y0 = raw[0];
        if (y0 != null && String(y0) !== "") {
          var ys = String(y0);
          if (ys.length >= 4) return ys.slice(0, 4);
        }
        if (raw[1] != null) return String(raw[1]).slice(0, 4);
      }
      var ds = String(cqCell(raw));
      return ds.length >= 4 ? ds.slice(0, 4) : ds;
    }
    var v = cqCell(raw);
    return v == null ? "" : v;
  }

  function captionText(cap) {
    if (cap == null) return "";
    if (typeof cap === "string") return cap;
    if (typeof cap === "object") return cap.zh_CN || cap.en_US || cap.zh_TW || "";
    return String(cap);
  }

  function collectCaptions(payload, pack) {
    var map = {};
    walkDeep(payload, function (obj) {
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
      var di = obj.dataindex != null ? obj.dataindex : obj.dataIndex != null ? obj.dataIndex : obj.fieldId;
      var cap = obj.caption != null ? obj.caption : obj.title != null ? obj.title : obj.header;
      var text = captionText(cap);
      if (typeof di === "string" && di && text) {
        if (!map[di]) map[di] = text;
      }
    });
    var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
    if (Array.isArray(packCols)) {
      for (var i = 0; i < packCols.length; i++) {
        var col = packCols[i];
        if (!col || typeof col !== "object") continue;
        var cdi = col.dataindex || col.dataIndex || col.fieldId;
        var ccap = captionText(col.caption || col.title || col.header);
        if (typeof cdi === "string" && cdi && typeof ccap === "string" && ccap) map[cdi] = ccap;
      }
    }
    return map;
  }

  function mapListPack(pack, payload, opts) {
    opts = opts || {};
    var idx = pack.dataindex || {};
    var captions = collectCaptions(payload || pack, pack);
    var keys = Object.keys(idx);
    keys.sort(function (a, b) {
      return Number(idx[a]) - Number(idx[b]);
    });
    var fieldKeys = [];
    var used = {};
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (shouldSkipKey(k, idx, opts) || used[k]) continue;
      used[k] = true;
      fieldKeys.push({ dataindex: k, caption: captions[k] || k });
    }
    var rows = (pack.rows || []).map(function (row) {
      var out = {};
      for (var j = 0; j < fieldKeys.length; j++) {
        var f = fieldKeys[j];
        var pos = idx[f.dataindex];
        var raw = pos != null ? row[pos] : "";
        out[f.dataindex] = formatValue(f.dataindex, raw);
      }
      return out;
    });
    return { columns: fieldKeys, rows: rows };
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
    return new Promise(function (resolve, reject) {
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
            if (isTimeoutPayload(text)) throw new Error("表单会话超时");
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

  function walkDeep(obj, fn, depth, seen) {
    if (!obj || typeof obj !== "object" || (depth || 0) > 16) return;
    if (!seen) seen = [];
    if (seen.indexOf(obj) >= 0) return;
    seen.push(obj);
    fn(obj);
    if (Array.isArray(obj)) {
      var n = Math.min(obj.length, 400);
      for (var i = 0; i < n; i++) walkDeep(obj[i], fn, (depth || 0) + 1, seen);
      return;
    }
    var keys = Object.keys(obj);
    for (var k = 0; k < keys.length && k < 400; k++) walkDeep(obj[keys[k]], fn, (depth || 0) + 1, seen);
  }

  function tryParse(data) {
    if (data == null || typeof data === "object") return data;
    var text = String(data);
    var brace = text.indexOf("{");
    var bracket = text.indexOf("[");
    var start = brace < 0 ? bracket : bracket < 0 ? brace : Math.min(brace, bracket);
    if (start > 0) text = text.slice(start);
    try {
      return JSON.parse(text);
    } catch (e) {
      return data;
    }
  }

  function packCell(pack, row, key) {
    var idx = (pack && pack.dataindex) || {};
    if (idx[key] == null) return "";
    return cqCell(row[idx[key]]);
  }

  function findPkField(pack, payload) {
    var idx = (pack && pack.dataindex) || {};
    if (TARGET.pkField && idx[TARGET.pkField] != null) return TARGET.pkField;
    if (idx.id != null) return "id";
    if (idx.pkid != null) return "pkid";
    var found = "";
    walkDeep(tryParse(payload), function (obj) {
      if (found || !obj || typeof obj !== "object") return;
      var pk = obj.pkFieldName || obj.pkfieldname;
      if (typeof pk !== "string" || !pk) return;
      var short = pk.split(".").pop();
      if (idx[pk] != null) found = pk;
      else if (idx[short] != null) found = short;
    });
    if (found) return found;
    var keys = Object.keys(idx);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].length > 3 && keys[i].slice(keys[i].length - 3) === "_id") return keys[i];
    }
    return "id";
  }

  function extractTable(payload) {
    var parsedPayload = tryParse(payload);
    var pack = findBillListPack(parsedPayload);
    if (!pack) return { columns: [], rows: [] };
    return mapListPack(pack, parsedPayload);
  }

  function extractListBills(payload) {
    var parsedPayload = tryParse(payload);
    var pack = findBillListPack(parsedPayload);
    if (!pack) return { columns: [], rows: [] };
    var table = mapListPack(pack, parsedPayload);
    var pkField = findPkField(pack, parsedPayload);
    TARGET.pkField = pkField;
    if (Array.isArray(pack.postcols) && pack.postcols.length) TARGET.postcols = pack.postcols.slice();
    var rows = (pack.rows || []).map(function (row, i) {
      var mapped = {};
      var src = table.rows[i] || {};
      var sk = Object.keys(src);
      for (var s = 0; s < sk.length; s++) mapped[sk[s]] = src[sk[s]];
      mapped._pkId = String(packCell(pack, row, pkField) || packCell(pack, row, "id") || packCell(pack, row, "pkid") || "");
      mapped._billno = String(mapped.billno || packCell(pack, row, "billno") || "");
      mapped._billstatus = String(packCell(pack, row, "billstatus") || "");
      mapped._rowIndex = i;
      return mapped;
    });
    return { columns: table.columns, rows: rows };
  }

  function isEntryName(name) {
    var s = String(name || "").toLowerCase();
    if (!s) return false;
    return s.indexOf("entry") >= 0 || s.indexOf("billentry") >= 0;
  }

  function packFromObj(obj) {
    if (!obj || typeof obj !== "object") return null;
    if (Array.isArray(obj.rows) && obj.dataindex && typeof obj.dataindex === "object" && !Array.isArray(obj.dataindex)) return obj;
    if (obj.data && Array.isArray(obj.data.rows) && obj.data.dataindex) return obj.data;
    if (obj.p && Array.isArray(obj.p.rows) && obj.p.dataindex) return obj.p;
    if (Array.isArray(obj.p)) {
      for (var i = 0; i < obj.p.length; i++) {
        var item = obj.p[i];
        if (item && Array.isArray(item.rows) && item.dataindex) return item;
      }
    }
    return null;
  }

  function findEntryPacks(payload) {
    var packs = [];
    function add(key, data) {
      if (!data || !Array.isArray(data.rows)) return;
      for (var i = 0; i < packs.length; i++) if (packs[i].data === data) return;
      packs.push({ key: String(key || "entry"), data: data });
    }
    var root = tryParse(payload);
    walkDeep(root, function (obj) {
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
      var k = obj.k || obj.c || obj.key || "";
      if (isEntryName(k)) {
        var p = packFromObj(obj);
        if (p) add(k, p);
      }
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        if (!isEntryName(keys[i])) continue;
        var pack = packFromObj(obj[keys[i]]);
        if (pack) add(keys[i], pack);
      }
    });
    if (!packs.length) {
      walkDeep(root, function (obj) {
        if (!obj || typeof obj !== "object") return;
        var k = String(obj.k || obj.c || "");
        if (k === "billlistap") return;
        var p = packFromObj(obj);
        if (p) add(k || "entry", p);
      });
    }
    return packs;
  }

  function pickBestEntryPack(packs) {
    if (!packs || !packs.length) return null;
    var named = [];
    for (var i = 0; i < packs.length; i++) if (isEntryName(packs[i].key)) named.push(packs[i]);
    var list = named.length ? named : packs;
    var best = list[0];
    for (var j = 1; j < list.length; j++) {
      if ((list[j].data.rows || []).length > (best.data.rows || []).length) best = list[j];
    }
    return best;
  }

  function hasEntryData(payload) {
    return findEntryPacks(payload).length > 0;
  }

  function isControlType(key) {
    var low = String(key || "").toLowerCase();
    if (!low) return true;
    if (low === "billlistap" || low === "root" || low === "view") return true;
    if (low.length >= 2 && low.slice(low.length - 2) === "ap") return true;
    return false;
  }

  function isSkipFieldKey(key) {
    if (!key || key.charAt(0) === "_") return true;
    var skip = {
      k: 1, c: 1, a: 1, p: 1, u: 1, data: 1, dataindex: 1, rows: 1, cols: 1, columns: 1,
      pageId: 1, appId: 1, params: 1, recId: 1, t: 1, method: 1, url: 1, query: 1,
      caption: 1, title: 1, header: 1, fieldId: 1, dataIndex: 1, key: 1,
      selRows: 1, selDatas: 1, postData: 1, args: 1, methodName: 1,
      msg: 1, messageType: 1, confirmType: 1, button_type: 1, detail: 1,
      status: 1, response: 1, via: 1, body: 1, headers: 1, headerKeys: 1,
    };
    if (skip[key]) return true;
    if (isEntryName(key)) return true;
    if (isControlType(key)) return true;
    return false;
  }

  function setHeaderVal(header, key, raw) {
    if (isSkipFieldKey(key)) return;
    if (raw && typeof raw === "object" && !Array.isArray(raw) && (raw.rows || raw.dataindex)) return;
    var val = formatValue(key, raw);
    if (val == null || val === "") return;
    if (typeof val === "object") {
      try {
        val = JSON.stringify(val);
      } catch (e) {
        return;
      }
      if (val.length > 500) val = val.slice(0, 500) + "…";
    }
    if (header[key] == null || header[key] === "") header[key] = val;
  }

  function headerFromListBill(bill) {
    var header = {};
    if (!bill) return header;
    var keys = Object.keys(bill);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].charAt(0) === "_") continue;
      header[keys[i]] = bill[keys[i]];
    }
    return header;
  }

  function extractBillHeader(payload, listBill) {
    var header = {};
    var root = tryParse(payload);
    var models = [];
    walkDeep(root, function (obj) {
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
      if (packFromObj(obj)) return;
      if (obj.query || obj.recId) return;
      if (obj.billno == null && obj.billstatus == null) return;
      models.push(obj);
    });
    var best = null;
    var bestN = -1;
    for (var m = 0; m < models.length; m++) {
      var n = 0;
      var mk = Object.keys(models[m]);
      for (var i = 0; i < mk.length; i++) {
        if (!isSkipFieldKey(mk[i])) n++;
      }
      if (n > bestN) {
        bestN = n;
        best = models[m];
      }
    }
    if (best) {
      var bk = Object.keys(best);
      for (var b = 0; b < bk.length; b++) {
        var key = bk[b];
        if (isSkipFieldKey(key)) continue;
        var v = best[key];
        if (v && typeof v === "object" && !Array.isArray(v) && (v.rows || v.dataindex)) continue;
        setHeaderVal(header, key, v);
      }
    }
    walkDeep(root, function (obj) {
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
      var k = obj.k || obj.c;
      if (typeof k === "string" && k && obj.v !== undefined && !isSkipFieldKey(k)) {
        setHeaderVal(header, k, obj.v);
      }
      if (typeof k !== "string" || !k || isSkipFieldKey(k)) return;
      var raw = obj.data !== undefined ? obj.data : obj.p;
      if (Array.isArray(obj.p) && obj.p.length) {
        if (obj.a === "setValue") raw = obj.p[0];
        else if (typeof obj.p[0] === "string" && (obj.p[0] === "setValue" || obj.p[0] === "setText") && obj.p.length > 1) raw = obj.p[1];
      }
      if (raw === undefined || packFromObj(raw) || (raw && raw.rows)) return;
      setHeaderVal(header, k, raw);
    });
    var listHeader = headerFromListBill(listBill);
    var lk = Object.keys(listHeader);
    for (var j = 0; j < lk.length; j++) {
      if (header[lk[j]] == null || header[lk[j]] === "") header[lk[j]] = listHeader[lk[j]];
    }
    return header;
  }

  function headerToColumns(header, payload) {
    var captions = collectCaptions(payload, null);
    var keys = Object.keys(header || {});
    var cols = [];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].charAt(0) === "_") continue;
      cols.push({
        dataindex: keys[i],
        caption: captions[keys[i]] || keys[i],
        part: "header",
      });
    }
    return cols;
  }

  function flattenBill(header, entry, meta) {
    var out = {};
    var hk = Object.keys(header || {});
    for (var i = 0; i < hk.length; i++) {
      if (hk[i].charAt(0) === "_") continue;
      out[hk[i]] = header[hk[i]];
    }
    if (entry) {
      var ek = Object.keys(entry);
      for (var j = 0; j < ek.length; j++) {
        var k = ek[j];
        if (k.charAt(0) === "_") continue;
        out[Object.prototype.hasOwnProperty.call(out, k) ? "entry_" + k : k] = entry[k];
      }
    }
    out._billPkId = (meta && meta.pk) || "";
    out._entryKey = (meta && meta.entryKey) || "";
    out._entrySeq = meta && meta.seq != null ? meta.seq : "";
    out._part = entry ? "header+entry" : "header";
    return out;
  }

  function combineColumns(headerCols, entryCols, header) {
    var cols = (headerCols || []).slice();
    var seen = {};
    for (var i = 0; i < cols.length; i++) seen[cols[i].dataindex] = true;
    for (var j = 0; j < (entryCols || []).length; j++) {
      var c = entryCols[j];
      var key = header && Object.prototype.hasOwnProperty.call(header, c.dataindex) ? "entry_" + c.dataindex : c.dataindex;
      if (seen[key]) continue;
      seen[key] = true;
      cols.push({ dataindex: key, caption: c.caption || c.dataindex, part: "entry" });
    }
    return cols;
  }

  function billDataUseful(parsed) {
    return !!(parsed && parsed.entries && parsed.entries.length);
  }

  function isBillPageId(pageId) {
    var pid = String(pageId || "");
    if (!pid) return false;
    var listId = rec.listPageIdUsed || "";
    if (listId && pid.indexOf(listId + "_") === 0) return true;
    var formId = TARGET.dataFormId || TARGET.billFormId || "";
    if (formId && pid.indexOf("_" + formId + "_") >= 0) return true;
    return false;
  }

  function isListPageId(pageId) {
    var pid = String(pageId || "");
    if (!pid) return false;
    if (rec.listPageIdUsed) return pid === rec.listPageIdUsed;
    return !!(TARGET.menuItemId && pid.indexOf(TARGET.menuItemId) === 0 && !isBillPageId(pid));
  }

  function extractBillData(payload, listBill) {
    var parsedPayload = tryParse(payload);
    var header = extractBillHeader(parsedPayload, listBill);
    var pack = pickBestEntryPack(findEntryPacks(parsedPayload));
    var mapped = pack ? mapListPack(pack.data, parsedPayload, { keepSeq: true }) : { columns: [], rows: [] };
    var entryKey = pack ? pack.key : "";
    var entries = mapped.rows || [];
    var headerCols = headerToColumns(header, parsedPayload);
    var pk = (listBill && listBill._pkId) || (TARGET.pkField && header[TARGET.pkField]) || header.id || "";
    var flat = [];
    if (!entries.length) {
      flat.push(flattenBill(header, null, { pk: pk, entryKey: entryKey, seq: -1 }));
    } else {
      for (var i = 0; i < entries.length; i++) {
        flat.push(flattenBill(header, entries[i], { pk: pk, entryKey: entryKey, seq: i }));
      }
    }
    return {
      header: header,
      headerColumns: headerCols,
      entries: entries,
      entryColumns: mapped.columns || [],
      columns: combineColumns(headerCols, mapped.columns || [], header),
      rows: flat,
      entryKey: entryKey,
    };
  }

  function shrinkReqResponse(r) {
    if (r && r.response && r.response.length > 6000) r.response = clip(r.response, 4000);
  }

  function rememberListReq(r) {
    if (!r || !r.query || r.query.ac !== "loadData") return;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return;
    if (r.response && String(r.response).indexOf("billlistap") < 0) return;
    if (TARGET.dataFormId && f !== TARGET.dataFormId) return;
    TARGET.dataFormId = f;
    TARGET.dataAppId = r.appId || r.query.appId || TARGET.dataAppId;
    rec.discoveredFormId = TARGET.dataFormId;
    rec.discoveredAppId = TARGET.dataAppId;
  }

  function isListLoadData(r) {
    if (!r || !r.query || r.query.ac !== "loadData") return false;
    if (!r.response || r.response.length <= 8 || isTimeoutPayload(r.response)) return false;
    if (isBillPageId(r.pageId)) return false;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return false;
    if (isListPageId(r.pageId)) return true;
    if (TARGET.dataFormId) return f === TARGET.dataFormId && /billlistap/.test(r.response);
    return /billlistap/.test(r.response);
  }

  function findPartyQuarterMenu() {
    var texts = TARGET.menuTexts || [];
    for (var i = 0; i < texts.length; i++) {
      var el = findClickTarget(texts[i]);
      if (el) return { el: el, text: texts[i] };
    }
    return null;
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
      if (el.closest && (el.closest("#cq-pq-status") || el.closest("#cq-pq-copy-panel") || el.closest("#cq-rec-status") || el.closest("#cq-rec-copy-panel") || el.closest("#" + "shadcn-hello-inject-root"))) {
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

  function fireDblClick(el) {
    if (!el) return false;
    fireClick(el);
    try {
      var opts = { bubbles: true, cancelable: true, view: window };
      el.dispatchEvent(new MouseEvent("dblclick", opts));
    } catch (e) {}
    return true;
  }

  function findBillLink(bill) {
    var no = bill && (bill._billno || bill.billno);
    if (!no) return null;
    return (
      findClickTarget(String(no), "span.link-cell-content, span.link-color, a, span") ||
      findClickTarget(String(no), "a, span, div, td") ||
      findClickTarget(String(no))
    );
  }

  function findRowContaining(text) {
    if (!text) return null;
    var nodes = [];
    try {
      nodes = document.querySelectorAll("tr, [role='row'], .kd-cq-grid-row, .kd-cq-table-row");
    } catch (e) {
      return null;
    }
    var best = null;
    var bestLen = Infinity;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && (el.closest("#cq-pq-status") || el.closest("#cq-pq-copy-panel") || el.closest("#cq-rec-status") || el.closest("#" + "shadcn-hello-inject-root"))) continue;
      var raw = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
      if (raw.indexOf(String(text)) < 0) continue;
      if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;
      if (raw.length < bestLen) {
        bestLen = raw.length;
        best = el;
      }
    }
    return best;
  }

  function findToolbarClose() {
    var sels = [".kd-cq-toolbar button", ".kd-cq-toolbar-item", ".kd-cq-btn", "button"];
    for (var s = 0; s < sels.length; s++) {
      var nodes = [];
      try {
        nodes = document.querySelectorAll(sels[s]);
      } catch (e1) {
        continue;
      }
      for (var i = nodes.length - 1; i >= 0; i--) {
        var el = nodes[i];
        if (el.closest && (el.closest("#cq-pq-status") || el.closest("#cq-pq-copy-panel") || el.closest("#cq-rec-copy-panel"))) continue;
        var t = (el.innerText || el.textContent || el.getAttribute("title") || "").replace(/\s+/g, " ").trim();
        if (t !== "关闭" && t !== "取消") continue;
        if (el.offsetWidth === 0 && el.offsetHeight === 0) continue;
        return el;
      }
    }
    return null;
  }

  function closeBillForm(bill) {
    var no = bill && (bill._billno || bill.billno);
    if (no) {
      var tabs = [];
      try {
        tabs = document.querySelectorAll(".kd-cq-tab-item, .kd-cq-homepage-tab-item, [role='tab']");
      } catch (e) {}
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var title = (tab.innerText || tab.textContent || "").replace(/\s+/g, " ").trim();
        if (title.indexOf(String(no)) < 0) continue;
        var closeBtn = tab.querySelector(".close, .kd-cq-tab-close, [class*='close']");
        if (closeBtn) {
          fireClick(closeBtn);
          return waitMs(400);
        }
      }
    }
    var btn = findToolbarClose();
    if (btn) {
      fireClick(btn);
      return waitMs(400);
    }
    return waitMs(200);
  }

  function rememberBillReq(r) {
    if (!r || !r.query || r.query.ac !== "loadData") return;
    if (!isBillPageId(r.pageId)) return;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return;
    TARGET.billFormId = f;
    TARGET.billAppId = r.appId || r.query.appId || TARGET.billAppId;
    rec.discoveredBillFormId = f;
    rec.discoveredBillAppId = TARGET.billAppId;
  }

  function isBillFormLoad(r, minTs) {
    if (!r || !r.query || r.query.ac !== "loadData") return false;
    if (!r.response || r.response.length <= 8 || isTimeoutPayload(r.response)) return false;
    var ts = Date.parse(r.t);
    if (minTs && !isNaN(ts) && ts < minTs - 300) return false;
    if (isBillPageId(r.pageId)) return true;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return false;
    if (f === TARGET.dataFormId && !isBillPageId(r.pageId)) return false;
    if (TARGET.billFormId && TARGET.billFormId !== TARGET.dataFormId) return f === TARGET.billFormId;
    return /"k"\s*:\s*"entryentity"/.test(r.response) || hasEntryData(r.response);
  }

  function listSelData(bill) {
    var postcols = TARGET.postcols;
    if (!Array.isArray(postcols) || !postcols.length) {
      postcols = [TARGET.pkField || "crrc_dj_cb_count_id", "billstatus", "billno"];
    }
    return postcols.map(function (col) {
      if (col === "billno") return bill._billno || bill.billno || "";
      if (col === "billstatus") return bill._billstatus || "";
      if (col === TARGET.pkField || String(col).slice(-3) === "_id") return bill._pkId || "";
      if (bill[col] != null && bill[col] !== "") return String(bill[col]);
      return "";
    });
  }

  function invokeListOpen(rowIndex, bill, started) {
    var appId = TARGET.dataAppId;
    var formId = TARGET.dataFormId;
    var pageId = rec.listPageIdUsed;
    if (!appId || !formId || !pageId) {
      return Promise.reject(new Error("列表会话不完整，无法打开单据"));
    }
    var field = "billno";
    var ctrl = TARGET.listControl || "billlistap";
    var sel = listSelData(bill);
    setStatus("请求打开第 " + (rowIndex + 1) + " 张单据（entryRowClick）");
    return cqInvoke(appId, formId, "entryRowClick", pageId, [
      {
        key: ctrl,
        methodName: "entryRowClick",
        args: [rowIndex, field],
        postData: [
          {
            billlistap: {
              fieldKey: field,
              row: rowIndex,
              selRows: [rowIndex],
              selDatas: [sel],
              isClientNewRow: false,
              clientNewRows: "",
            },
          },
          [],
        ],
      },
      {
        key: ctrl,
        methodName: "hyperLinkClick",
        args: [field, rowIndex],
        postData: [{}, []],
      },
    ]).then(function () {
      return waitForReq(function (r) {
        return isBillFormLoad(r, started || Date.now() - 2000);
      }, 20000);
    });
  }

  function pickBillLoadReq(started) {
    for (var i = rec.requests.length - 1; i >= 0; i--) {
      if (isBillFormLoad(rec.requests[i], started)) return rec.requests[i];
    }
    return null;
  }

  function openOneBill(bill, rowIndex) {
    var started = Date.now();
    function waitBill(ms) {
      return waitForReq(function (r) {
        return isBillFormLoad(r, started);
      }, ms || 20000).then(function (r) {
        rememberBillReq(r);
        return r;
      });
    }
    function tryDomOpen() {
      return waitFor(function waitLink() {
        return findBillLink(bill);
      }, 8000, 200).then(function (link) {
        setStatus("点击编号打开单据 " + (bill._billno || bill.billno || ""));
        fireClick(link);
        return waitBill(12000).catch(function () {
          fireDblClick(link);
          return waitBill(8000);
        });
      });
    }
    return tryDomOpen()
      .catch(function () {
        return invokeListOpen(rowIndex, bill, started);
      })
      .then(function (res) {
        var billReq = res && res.query && isBillFormLoad(res, started) ? res : pickBillLoadReq(started);
        if (!billReq) throw new Error("未等到单据 loadData（pageId 含主键）");
        rememberBillReq(billReq);
        var parsed = extractBillData(billReq.response, bill);
        if (!parsed.entries.length && String(billReq.response || "").indexOf("entryentity") < 0) {
          throw new Error("单据已开但未解析到分录 entryentity");
        }
        rec.partyRawPreview =
          rec.partyRawPreview ||
          clip(typeof billReq.response === "string" ? billReq.response : JSON.stringify(billReq.response), 2000);
        return closeBillForm(bill).then(function () {
          return parsed;
        });
      });
  }

  function mergeColList(into, add) {
    var seen = {};
    var i;
    for (i = 0; i < into.length; i++) seen[into[i].dataindex] = true;
    for (i = 0; i < (add || []).length; i++) {
      if (!add[i] || seen[add[i].dataindex]) continue;
      seen[add[i].dataindex] = true;
      into.push(add[i]);
    }
  }

  function collectEntriesFromBills(bills) {
    var all = [];
    var documents = [];
    var headerCols = [];
    var entryCols = [];
    rec.entryErrors = [];
    rec.partyEntryKey = "";
    rec.billsOpened = 0;
    rec.billsFailed = 0;
    rec.entryRowCount = 0;
    var n = Math.min(bills.length, TARGET.maxBills || 40);
    function pushParsed(bill, parsed) {
      var header = (parsed && parsed.header) || headerFromListBill(bill);
      var entries = (parsed && parsed.entries) || [];
      var rows = (parsed && parsed.rows) || [];
      if (!rows.length) rows = [flattenBill(header, null, { pk: bill._pkId || "", entryKey: "", seq: -1 })];
      documents.push({
        _pkId: bill._pkId || "",
        _billno: bill._billno || bill.billno || header.billno || "",
        header: header,
        entries: entries,
        entryKey: (parsed && parsed.entryKey) || "",
      });
      rec.entryRowCount += entries.length;
      if (parsed && parsed.entryKey && !rec.partyEntryKey) rec.partyEntryKey = parsed.entryKey;
      mergeColList(headerCols, parsed && parsed.headerColumns);
      mergeColList(entryCols, parsed && parsed.entryColumns);
      for (var r = 0; r < rows.length; r++) all.push(rows[r]);
    }
    function step(i) {
      if (i >= n) {
        rec.partyBills = documents;
        rec.partyHeaderColumns = headerCols;
        rec.partyEntryColumns = entryCols;
        var allHeader = {};
        for (var d = 0; d < documents.length; d++) {
          var h = documents[d] && documents[d].header;
          if (!h) continue;
          var hk = Object.keys(h);
          for (var hi = 0; hi < hk.length; hi++) allHeader[hk[hi]] = h[hk[hi]];
        }
        rec.partyColumns = combineColumns(headerCols, entryCols, allHeader);
        rec.partyRows = all;
        return Promise.resolve(all);
      }
      var bill = bills[i];
      var idx = bill._rowIndex != null ? bill._rowIndex : i;
      setStatus("打开单据 " + (i + 1) + "/" + n + " " + (bill._billno || bill.billno || "") + "（头+分录）");
      return openOneBill(bill, idx).then(
        function (parsed) {
          rec.billsOpened += 1;
          pushParsed(bill, parsed);
          return waitMs(350).then(function () {
            return step(i + 1);
          });
        },
        function (err) {
          rec.billsFailed += 1;
          rec.entryErrors.push({
            billno: bill._billno || bill.billno || "",
            pkId: bill._pkId || "",
            error: String(err && err.message ? err.message : err),
          });
          console.warn(TAG, "打开单据失败，仍保留列表头", bill._billno || bill._pkId, err && err.message);
          pushParsed(bill, {
            header: headerFromListBill(bill),
            headerColumns: headerToColumns(headerFromListBill(bill), {}),
            entries: [],
            entryColumns: [],
            rows: [flattenBill(headerFromListBill(bill), null, { pk: bill._pkId || "", entryKey: "", seq: -1 })],
            entryKey: "",
          });
          return waitMs(250).then(function () {
            return step(i + 1);
          });
        }
      );
    }
    return step(0);
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
    var el = document.getElementById("cq-pq-status");
    if (!el) {
      el = document.createElement("div");
      el.id = "cq-pq-status";
      el.style.cssText =
        "position:fixed;right:12px;bottom:12px;z-index:2147483645;background:#111;color:#fff;padding:8px 12px;border-radius:8px;font:12px/1.4 sans-serif;max-width:420px;box-shadow:0 6px 20px rgba(0,0,0,.25);";
      try {
        document.body.appendChild(el);
      } catch (e) {
        return;
      }
    }
    el.textContent = "[cq-pq] " + rec.status;
  }

  var fetching = false;
  function fetchPartyQuarterly() {
    if (fetching) return fetching;
    rec.partyError = null;
    var startedAt = Date.now();
    function afterStart(r) {
      if (!r || !r.t) return false;
      var ts = Date.parse(r.t);
      return !isNaN(ts) && ts >= startedAt - 300;
    }
    setStatus("开始拉季度党群绩效：点应用 → 点党费 → 打开列表 → 逐张进单据读单据头和分录");
    fetching = Promise.resolve()
      .then(function () {
        var consolePageId = latestConsolePageId();
        var suffix = pickSuffix();
        if (!consolePageId || !suffix) {
          throw new Error("还没有主控台 pageId（root…）。等主控台加载完再执行 __cqPqRec.fetchPartyQuarterly()");
        }
        var menuPageId = TARGET.menuAppId + suffix;
        var listPageId = TARGET.menuItemId + suffix;
        rec.consolePageIdUsed = consolePageId;
        rec.menuPageIdUsed = menuPageId;
        rec.listPageIdUsed = listPageId;
        console.log(TAG, "consolePageId", consolePageId, "menuPageId", menuPageId, "listPageId", listPageId);

        function waitListLoad(minTs) {
          var from = minTs || startedAt;
          return waitForReq(function (r) {
            if (!r || !r.t) return false;
            var ts = Date.parse(r.t);
            if (isNaN(ts) || ts < from - 300) return false;
            return isListLoadData(r);
          }, 15000).then(function (r) {
            rememberListReq(r);
            return r;
          });
        }

        function treeMenuThenLoad() {
          setStatus("请求 treeMenuClick，等待列表 loadData");
          var waitFrom = Date.now();
          return cqInvoke(TARGET.menuAppId, TARGET.menuFormId, "treeMenuClick", menuPageId, [
            {
              key: TARGET.menuControl,
              methodName: "treeMenuClick",
              args: [TARGET.menuRoot, TARGET.menuItemId],
              postData: [{}, []],
            },
          ]).then(function () {
            if (TARGET.dataFormId && TARGET.dataAppId) {
              return cqInvoke(TARGET.dataAppId, TARGET.dataFormId, "loadData", listPageId, [
                { key: "", methodName: "loadData", args: [], postData: [] },
              ]);
            }
            return waitListLoad(waitFrom);
          });
        }

        return Promise.resolve()
          .then(function () {
            if (findClickTarget("党费")) return;
            var appEl =
              findClickTarget("应用", ".kd-cq-homepage-tab-item-text") || findClickTarget("应用");
            if (!appEl) {
              return cqInvoke(TARGET.consoleAppId, TARGET.consoleForm, "selectTab", consolePageId, [
                {
                  key: TARGET.appTabKey,
                  methodName: "selectTab",
                  args: [TARGET.appTabArg],
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
                reqForm(r, TARGET.menuFormId, "loadData") &&
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
            var hit = findPartyQuarterMenu();
            if (hit && hit.el) {
              setStatus("点击「" + hit.text + "」");
              fireClick(hit.el);
              return waitListLoad(Date.now()).catch(function () {
                console.warn(TAG, "点击菜单后未等到列表 loadData，改请求链");
                return treeMenuThenLoad();
              });
            }
            return treeMenuThenLoad();
          });
      })
      .then(function (res) {
        if (res && res.query) rememberListReq(res);
        var payload = res && res.response ? res.response : res;
        if (isTimeoutPayload(payload)) throw new Error("表单会话超时（列表页尚未建立）");
        var list = extractListBills(payload);
        if (!list.rows.length) {
          for (var i = rec.requests.length - 1; i >= 0; i--) {
            var r = rec.requests[i];
            if (!isListLoadData(r)) continue;
            rememberListReq(r);
            list = extractListBills(r.response);
            payload = r.response;
            if (list.rows.length) break;
          }
        }
        rec.partyListBills = list.rows;
        rec.partyBills = list.rows;
        rec.partyListColumns = list.columns;
        rec.partyRawPreview = clip(typeof payload === "string" ? payload : JSON.stringify(payload), 2000);
        console.log(TAG, "列表单据", list.rows.length, TARGET.dataFormId || "");
        if (list.rows.length) console.table(list.rows.slice(0, 20));
        if (!list.rows.length) {
          rec.partyRows = [];
          rec.partyColumns = [];
          setStatus("列表为空，无单据可打开分录");
          return [];
        }
        setStatus("列表 " + list.rows.length + " 张单据，等待编号出现后再打开单据头和分录");
        return waitFor(function waitListBillNo() {
          return findBillLink(list.rows[0]);
        }, 8000, 200)
          .catch(function () {
            return null;
          })
          .then(function () {
            return collectEntriesFromBills(list.rows);
          })
          .then(function (entryRows) {
          rec.partyRows = entryRows;
          var headN = rec.partyBills ? rec.partyBills.length : 0;
          var entryN = rec.entryRowCount || 0;
          if (!entryN && rec.billsFailed) {
            rec.partyError = "已打开列表，单据头已保留，但分录未解析到（失败 " + rec.billsFailed + " 张）";
          }
          setStatus(
            "单据头 " +
              headN +
              " 张，分录 " +
              entryN +
              " 行" +
              (TARGET.billFormId ? "，billFormId=" + TARGET.billFormId : "") +
              (rec.partyEntryKey ? "，" + rec.partyEntryKey : "") +
              "，可 __cqPqRec.copy()"
          );
          if (rec.partyHeaderColumns && rec.partyHeaderColumns.length) console.log(TAG, "单据头列", rec.partyHeaderColumns);
          if (rec.partyEntryColumns && rec.partyEntryColumns.length) console.log(TAG, "分录列", rec.partyEntryColumns);
          if (entryRows.length) console.table(entryRows.slice(0, 20));
          else console.log(TAG + " 未解析到摊平行，列表预览", rec.partyRawPreview);
          return entryRows;
        });
      })
      .then(
        function (rows) {
          fetching = false;
          return rows;
        },
        function (err) {
          fetching = false;
          rec.partyError = String(err && err.message ? err.message : err);
          setStatus("拉数失败：" + rec.partyError);
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
      setStatus("开始自动拉季度党群绩效（单据头+分录）");
      fetchPartyQuarterly();
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
      partyError: rec.partyError,
      partyBillCount: rec.partyBills ? rec.partyBills.length : 0,
      partyBills: rec.partyBills,
      partyListBills: rec.partyListBills,
      partyListColumns: rec.partyListColumns,
      partyHeaderColumns: rec.partyHeaderColumns,
      partyEntryColumns: rec.partyEntryColumns,
      partyRowCount: rec.partyRows ? rec.partyRows.length : 0,
      entryRowCount: rec.entryRowCount || 0,
      partyColumns: rec.partyColumns,
      partyRows: rec.partyRows,
      partyEntryKey: rec.partyEntryKey || "",
      billsOpened: rec.billsOpened || 0,
      billsFailed: rec.billsFailed || 0,
      entryErrors: rec.entryErrors || [],
      partyRawPreview: rec.partyRawPreview,
      discoveredFormId: rec.discoveredFormId || TARGET.dataFormId || "",
      discoveredAppId: rec.discoveredAppId || TARGET.dataAppId || "",
      discoveredBillFormId: rec.discoveredBillFormId || TARGET.billFormId || "",
      discoveredBillAppId: rec.discoveredBillAppId || TARGET.billAppId || "",
      listPageId: rec.listPageIdUsed || "",
      pkField: TARGET.pkField || "",
      menuItemId: TARGET.menuItemId,
      note: fetching
        ? "仍在拉数，请等控制台出现「单据头…分录…」或右下角状态变化后再 copy"
        : !rec.partyRows && !rec.partyError
          ? "尚未开始或尚未结束拉数。请等右下角状态，或执行 __cqPqRec.fetchPartyQuarterly()"
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
    var id = "cq-pq-copy-panel";
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
    if (window.__cqPqRec) window.__cqPqRec._alive = false;
    console.log(TAG + " 已停止记录（无法完整卸载 XHR/jQuery hook，刷新页面即可清除）");
  }

  function help() {
    console.log(
      [
        TAG + " 命令",
        "  __cqPqRec.copy()                    复制请求/操作/单据头+分录",
        "  __cqPqRec.download()                下载 cq-pq-rec.json",
        "  __cqPqRec.fetchPartyQuarterly()     点「应用/党费/季度党群绩效贡献度」，再逐张打开单据读头和分录",
        "  __cqPqRec.autoFetch = false         禁止登录后自动拉数",
        "  __cqPqRec.stop()                    停止记录",
        "粘贴后请保持 Context 在顶层主控台。右下角出现「单据头…分录…」后再 copy。",
      ].join("\n")
    );
  }

  var api = {
    help: help,
    fetchPartyQuarterly: fetchPartyQuarterly,
    copy: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      showCopy(json, "记录 JSON：文本框内 Ctrl+C");
      return json;
    },
    download: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "cq-pq-rec.json";
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
  Object.defineProperty(api, "partyRows", {
    get: function () {
      return rec.partyRows;
    },
  });
  Object.defineProperty(api, "partyColumns", {
    get: function () {
      return rec.partyColumns;
    },
  });
  Object.defineProperty(api, "partyBills", {
    get: function () {
      return rec.partyBills;
    },
  });
  window.__cqPqRec = api;

  walkHook(window);
  setInterval(function () {
    if (rec._alive) walkHook(window);
  }, 2000);

  try {
    rec.href = location.href;
  } catch (e) {}
  setStatus("已挂钩。主控台 pageId 就绪后会自动拉季度党群绩效（单据头+分录），请勿立刻 copy");
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
    else setStatus("未找到主控台 pageId，请执行 __cqPqRec.fetchPartyQuarterly()");
  }
  bootAuto();
  return window.__cqPqRec;
})();
