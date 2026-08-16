/**
 * 苍穹登录后控制台脚本：记录请求 + 操作，并自动拉「党组织查询」。
 * 路径：应用 → 党费 → 党组织查询。列表/树在 loadData 里，一般不用进单据。
 *
 * 用法：刷新进入主控台后，F12 → Context 选顶层（苍穹云平台 / pc_main_console）→ 整份粘贴。
 * 右下角出现「党组织…行」后再执行 __cqOrgRec.copy()，不要一贴完就复制。
 *
 * 命令：
 *   window.__cqOrgRec.help()
 *   window.__cqOrgRec.copy()              复制记录（请求 + 列表/树）
 *   window.__cqOrgRec.download()          下载 cq-org-rec.json
 *   window.__cqOrgRec.fetchOrg()          点应用/党费/党组织查询并解析 loadData
 *   window.__cqOrgRec.autoFetch = false   关掉登录后自动拉数
 *   window.__cqOrgRec.stop()              停止记录
 */
(function () {
  var TAG = "[cq-org]";
  if (window.__cqOrgRec && window.__cqOrgRec._alive) {
    console.warn(TAG + " 已在运行，先 __cqOrgRec.stop() 再贴，或直接用现有命令");
    window.__cqOrgRec.help();
    return window.__cqOrgRec;
  }

  var MAX_LOG = 400;
  var MAX_BODY = 4000;
  var TARGET = {
    consoleAppId: "bos",
    consoleForm: "pc_main_console",
    appTabKey: "tabap",
    appTabArg: "appbeta",
    myAppForm: "tenant_myapp",
    menuAppId: "crrc_party_dues",
    menuFormId: "crrc_party_dues_apphome",
    menuControl: "navigationbar",
    menuRoot: "root",
    menuItemId: "2546603181119401984",
    dataAppId: "crrc_dj",
    dataFormId: "crrc_dj_org_tree_ext",
    menuTexts: ["党组织查询", "党组织"],
  };
  var STATUS_TEXT = { A: "暂存", B: "已提交", C: "已审核" };
  var ORG_TYPE_TEXT = { "1": "党委", "2": "党总支", "3": "党支部", "4": "党小组" };
  var ENABLE_TEXT = { "0": "禁用", "1": "可用" };

  var rec = {
    time: new Date().toISOString(),
    href: "",
    requests: [],
    ops: [],
    orgRows: null,
    orgColumns: null,
    orgTree: null,
    orgTreeRows: null,
    orgError: null,
    discoveredFormId: "",
    discoveredAppId: "",
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
    if (q && q.ac === "loadData" && q.f && !isReservedForm(q.f)) {
      max = q.f === TARGET.dataFormId ? 8000000 : 2000000;
    }
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
    if (!win.fetch || win.fetch.__cqOrgRec) return;
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
            maybeCaptureOrg(q, text, parsed.pageId);
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
    wrapped.__cqOrgRec = true;
    wrapped.__orig = orig;
    win.fetch = wrapped;
  }

  function hookXhr(win) {
    var XHR = win.XMLHttpRequest;
    if (!XHR || XHR.prototype.__cqOrgRec) return;
    var open = XHR.prototype.open;
    var send = XHR.prototype.send;
    var setHeader = XHR.prototype.setRequestHeader;
    XHR.prototype.open = function (method, url) {
      this.__cqOrgRecMeta = { method: String(method || "GET").toUpperCase(), url: String(url || ""), headers: {} };
      return open.apply(this, arguments);
    };
    XHR.prototype.setRequestHeader = function (k, v) {
      if (this.__cqOrgRecMeta) this.__cqOrgRecMeta.headers[k] = v;
      return setHeader.apply(this, arguments);
    };
    XHR.prototype.send = function (body) {
      var meta = this.__cqOrgRecMeta || {};
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
        maybeCaptureOrg(q, xhr.responseText, parsed.pageId);
        finishRequest(function (x) {
          return x.recId === recId;
        }, { status: xhr.status, response: clipResponse(q, xhr.responseText) });
      });
      return send.apply(this, arguments);
    };
    XHR.prototype.__cqOrgRec = true;
  }

  function hookJq(win) {
    var jq = win.jQuery || win.$;
    if (!jq || !jq.ajaxPrefilter || jq.__cqOrgRecPrefilter) return;
    jq.ajaxPrefilter(function (opts) {
      var url = opts.url || "";
      var q = parseQuery(url);
      var parsed = parseBody(opts.data);
      opts.__cqOrgRecId = rec.requests.length + "_" + Date.now();
      recordRequest({
        recId: opts.__cqOrgRecId,
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
    if (jq.ajaxComplete && !jq.__cqOrgRecComplete) {
      jq(win.document).ajaxComplete(function (ev, xhr, opts) {
        if (!opts || !opts.__cqOrgRecId) return;
        var qj = parseQuery(opts.url || "");
        var bodyText = xhr && xhr.responseText;
        maybeCaptureOrg(qj, bodyText, "");
        finishRequest(
          function (x) {
            return x.recId === opts.__cqOrgRecId;
          },
          {
            status: xhr && xhr.status,
            response: clipResponse(qj, bodyText),
          }
        );
      });
      jq.__cqOrgRecComplete = true;
    }
    jq.__cqOrgRecPrefilter = true;
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
  function isRecorderUi(el) {
    if (!el || !el.closest) return false;
    return !!(
      el.closest("#cq-org-status") ||
      el.closest("#cq-org-copy-panel") ||
      el.closest("#cq-rec-status") ||
      el.closest("#cq-pq-status") ||
      el.closest("#shadcn-hello-inject-root")
    );
  }
  function hookClicks(win) {
    var doc = win.document;
    if (!doc || doc.__cqOrgRecClick) return;
    doc.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (isRecorderUi(t)) return;
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
    doc.__cqOrgRecClick = true;
  }

  function hookWin(win) {
    if (!win || !rec._alive) return;
    try {
      void win.location.href;
    } catch (e) {
      return;
    }
    if (win.__cqOrgRecHooked) return;
    win.__cqOrgRecHooked = true;
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
    if (!obj || typeof obj !== "object" || depth > 14) return;
    if (seen.indexOf(obj) >= 0) return;
    seen.push(obj);
    fn(obj);
    if (!Array.isArray(obj)) {
      var mnSkip = String(obj.methodname || obj.methodName || "");
      if (mnSkip === "addNodes" || mnSkip === "updateNodes") return;
    }
    if (Array.isArray(obj)) {
      var n = Math.min(obj.length, 400);
      for (var i = 0; i < n; i++) walkObj(obj[i], fn, depth + 1, seen);
      return;
    }
    var keys = Object.keys(obj);
    for (var k = 0; k < keys.length && k < 400; k++) walkObj(obj[keys[k]], fn, depth + 1, seen);
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

  function captionText(cap) {
    if (cap == null) return "";
    if (typeof cap === "string") return cap;
    if (typeof cap === "object") return cap.zh_CN || cap.en_US || cap.zh_TW || "";
    return String(cap);
  }

  function collectCaptions(payload, pack) {
    var map = {};
    walkObj(
      payload,
      function (obj) {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
        var di = obj.dataindex != null ? obj.dataindex : obj.dataIndex != null ? obj.dataIndex : obj.fieldId;
        var cap = obj.caption != null ? obj.caption : obj.title != null ? obj.title : obj.header;
        var text = captionText(cap);
        if (typeof di === "string" && di && text && !map[di]) map[di] = text;
      },
      0,
      []
    );
    var packCols = pack && (pack.columns || pack.cols || pack.columnMetas);
    if (Array.isArray(packCols)) {
      for (var i = 0; i < packCols.length; i++) {
        var col = packCols[i];
        if (!col || typeof col !== "object") continue;
        var cdi = col.dataindex || col.dataIndex || col.fieldId;
        var ccap = captionText(col.caption || col.title || col.header);
        if (typeof cdi === "string" && cdi && ccap) map[cdi] = ccap;
      }
    }
    return map;
  }

  function shouldSkipKey(key, idx) {
    if (!key) return true;
    var low = String(key).toLowerCase();
    if (low === "crrc_listoperationcolumna") return true;
    if (low === "rk" || low === "s" || low === "cprop" || low === "l" || low === "vi" || low === "u") return true;
    if (low === "fseq" || low === "seq" || low === "rowkey") return true;
    if (low === "id" && idx && (idx.name != null || idx.number != null)) return false;
    if (key.length >= 3 && key.slice(key.length - 3) === "_id" && idx && (idx[key.slice(0, key.length - 3) + "_name"] != null || idx[key.slice(0, key.length - 3) + ".name"] != null)) {
      return true;
    }
    if (idx && (idx[key + "_name"] != null || idx[key + ".name"] != null)) return true;
    return false;
  }

  function formatValue(key, raw) {
    if (raw == null || raw === "") return "";
    if (key === "billstatus" || key === "status" || (String(key).indexOf("status") >= 0 && key !== "enable")) {
      var st = String(cqCell(raw));
      return STATUS_TEXT[st] || st;
    }
    if (key === "crrc_combofield") {
      var tp = String(cqCell(raw));
      return ORG_TYPE_TEXT[tp] || tp;
    }
    if (key === "enable") {
      var en = String(cqCell(raw));
      return ENABLE_TEXT[en] || en;
    }
    var v = cqCell(raw);
    if (v && typeof v === "object") return "";
    return v == null ? "" : v;
  }

  function orgFieldLabel(key) {
    var map = {
      name: "组织名称",
      number: "编码",
      billno: "编号",
      status: "数据状态",
      billstatus: "数据状态",
      parent: "上级",
      parent_name: "上级名称",
      "parent.name": "上级名称",
      longnumber: "长编码",
      orgpattern: "组织形态",
      crrc_combofield: "党组织类别",
      crrc_datefield: "成立时间",
      crrc_datefield2: "下次换届选举时间",
      crrc_datefield3: "本届委员会成立时间",
      crrc_integerfield: "任期",
      crrc_stepperfield: "排序码",
      enable: "使用状态",
      level: "级次",
      fullname: "组织长名称",
    };
    if (map[key]) return map[key];
    if (key.length > 5 && key.slice(key.length - 5) === "_name") {
      var base = key.slice(0, key.length - 5);
      if (map[base]) return map[base] + ".名称";
    }
    return key;
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

  function mapListPack(pack, payload) {
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
      if (shouldSkipKey(k, idx) || used[k]) continue;
      used[k] = true;
      fieldKeys.push({ dataindex: k, caption: captions[k] || orgFieldLabel(k) });
    }
    var rows = (pack.rows || []).map(function (row, ridx) {
      var out = { _rowId: "o" + ridx };
      for (var j = 0; j < fieldKeys.length; j++) {
        var f = fieldKeys[j];
        var pos = idx[f.dataindex];
        var raw = pos != null ? row[pos] : "";
        out[f.dataindex] = formatValue(f.dataindex, raw);
      }
      if (out.name == null) out.name = out[fieldKeys[0] ? fieldKeys[0].dataindex : ""] || "";
      return out;
    });
    return { columns: fieldKeys, rows: rows };
  }

  function nodeName(obj) {
    if (!obj || typeof obj !== "object") return "";
    return String(obj.name || obj.text || obj.title || obj.caption || obj.label || obj.nodename || "");
  }
  function nodeId(obj) {
    if (!obj || typeof obj !== "object") return "";
    return String(obj.id || obj.key || obj.nodeid || obj.number || obj.longnumber || "");
  }
  function nodeKids(obj) {
    if (!obj || typeof obj !== "object") return [];
    if (Array.isArray(obj.children)) return obj.children;
    if (Array.isArray(obj.nodes)) return obj.nodes;
    if (Array.isArray(obj.childs)) return obj.childs;
    if (Array.isArray(obj.items)) return obj.items;
    return [];
  }
  function looksLikeTreeNode(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return !!(nodeId(obj) || nodeName(obj)) && (nodeKids(obj).length || nodeName(obj));
  }

  function methodNameOf(obj) {
    if (!obj || typeof obj !== "object") return "";
    return String(obj.methodname || obj.methodName || "");
  }
  function treeArgsOf(obj) {
    var args = obj.args;
    if (!Array.isArray(args) || !args.length) return null;
    var first = args[0];
    if (Array.isArray(first) && first.length && looksLikeTreeNode(first[0])) return first;
    if (looksLikeTreeNode(first)) return [first];
    return null;
  }
  function countTreeNodes(nodes) {
    var n = 0;
    function walk(arr) {
      if (!Array.isArray(arr)) return;
      for (var i = 0; i < arr.length; i++) {
        n += 1;
        walk(nodeKids(arr[i]));
      }
    }
    walk(nodes);
    return n;
  }
  function slimTreeNodes(nodes) {
    if (!Array.isArray(nodes)) return [];
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n || typeof n !== "object") continue;
      out.push({
        id: nodeId(n),
        text: nodeName(n),
        name: nodeName(n),
        parentid: n.parentid != null ? String(n.parentid) : n.parentId != null ? String(n.parentId) : "",
        longNumber: n.longNumber || n.longnumber || "",
        children: slimTreeNodes(nodeKids(n)),
      });
    }
    return out;
  }
  function flattenTreeNodes(nodes, parentName, parentId, depth, listMap, out) {
    out = out || [];
    listMap = listMap || {};
    if (!Array.isArray(nodes)) return out;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!looksLikeTreeNode(n)) continue;
      var name = nodeName(n);
      var id = nodeId(n);
      var kids = nodeKids(n);
      var extra = listMap[id] || {};
      out.push({
        id: id,
        name: name,
        parentid: n.parentid || parentId || "",
        parentName: parentName || extra.parent_name || "",
        depth: depth || 0,
        longNumber: n.longNumber || extra.longnumber || "",
        childCount: kids.length,
        status: extra.status || formatValue("status", n.status || n.billstatus || ""),
        crrc_combofield: extra.crrc_combofield || "",
        crrc_datefield: extra.crrc_datefield || "",
        number: extra.number || "",
        level: extra.level == null ? "" : extra.level,
        enable: extra.enable || "",
        fullname: extra.fullname || "",
        crrc_dj_org_tree_ext_id: extra.crrc_dj_org_tree_ext_id || id,
      });
      flattenTreeNodes(kids, name, id, (depth || 0) + 1, listMap, out);
    }
    return out;
  }

  function findTreeRoots(payload) {
    var parsed = payload;
    if (typeof payload === "string") parsed = tryParse(payload);
    var best = null;
    var bestCount = -1;
    var bestMethod = "";
    function walkTreeAction(obj, depth, seen) {
      if (!obj || typeof obj !== "object" || depth > 16) return;
      if (seen.indexOf(obj) >= 0) return;
      seen.push(obj);
      if (!Array.isArray(obj)) {
        var mn = methodNameOf(obj);
        if (mn === "addNodes" || mn === "updateNodes") {
          var arr = treeArgsOf(obj);
          if (arr && arr.length) {
            var c = countTreeNodes(arr);
            if (c > bestCount || (c === bestCount && mn === "addNodes" && bestMethod !== "addNodes")) {
              best = arr;
              bestCount = c;
              bestMethod = mn;
            }
          }
          return;
        }
      }
      if (Array.isArray(obj)) {
        var n = Math.min(obj.length, 80);
        var i;
        for (i = 0; i < n; i++) walkTreeAction(obj[i], depth + 1, seen);
        return;
      }
      var keys = Object.keys(obj);
      var k;
      for (k = 0; k < keys.length && k < 80; k++) {
        if (keys[k] === "args") continue;
        walkTreeAction(obj[keys[k]], depth + 1, seen);
      }
    }
    walkTreeAction(parsed, 0, []);
    if (best) return [{ key: bestMethod, nodes: slimTreeNodes(best) }];
    var roots = [];
    var seen = [];
    walkObj(
      payload,
      function (obj) {
        if (!obj || typeof obj !== "object") return;
        var k = String(obj.k || obj.c || obj.key || "").toLowerCase();
        var arr = null;
        if (Array.isArray(obj.nodes)) arr = obj.nodes;
        else if (obj.data && Array.isArray(obj.data.nodes)) arr = obj.data.nodes;
        else if (obj.p && Array.isArray(obj.p.nodes)) arr = obj.p.nodes;
        else if (k.indexOf("tree") >= 0 && Array.isArray(obj.data)) arr = obj.data;
        else if (k.indexOf("tree") >= 0 && obj.data && Array.isArray(obj.data.rows)) arr = obj.data.rows;
        if (!arr || !arr.length || !looksLikeTreeNode(arr[0])) return;
        if (seen.indexOf(arr) >= 0) return;
        seen.push(arr);
        roots.push({ key: k || "tree", nodes: slimTreeNodes(arr) });
      },
      0,
      []
    );
    return roots;
  }

  function extractOrgData(payload) {
    var parsed = tryParse(payload);
    var pack = findBillListPack(parsed);
    var table = pack ? mapListPack(pack, parsed) : { columns: [], rows: [] };
    var listMap = {};
    var li;
    for (li = 0; li < table.rows.length; li++) {
      var rid = String(table.rows[li].crrc_dj_org_tree_ext_id || "");
      if (rid) listMap[rid] = table.rows[li];
    }
    var trees = findTreeRoots(parsed);
    var treeRows = [];
    var treeNodes = [];
    for (var t = 0; t < trees.length; t++) {
      treeNodes = treeNodes.concat(trees[t].nodes);
      flattenTreeNodes(trees[t].nodes, "", "", 0, listMap, treeRows);
    }
    if (!table.rows.length && treeRows.length) {
      table = {
        columns: [
          { dataindex: "name", caption: "组织名称" },
          { dataindex: "status", caption: "数据状态" },
          { dataindex: "parentName", caption: "上级名称" },
          { dataindex: "id", caption: "内码" },
          { dataindex: "depth", caption: "层级" },
        ],
        rows: treeRows,
      };
    }
    return {
      columns: table.columns,
      rows: table.rows,
      tree: treeNodes.length ? treeNodes : null,
      treeRows: treeRows,
      treeRowCount: treeRows.length,
    };
  }

  function rememberListReq(r) {
    if (!r || !r.query || r.query.ac !== "loadData") return;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return;
    if (!r.response || r.response.length <= 8 || isTimeoutPayload(r.response)) return;
    TARGET.dataFormId = f;
    TARGET.dataAppId = r.appId || r.query.appId || TARGET.dataAppId;
    rec.discoveredFormId = TARGET.dataFormId;
    rec.discoveredAppId = TARGET.dataAppId;
  }

  function isListPageId(pageId) {
    var pid = String(pageId || "");
    if (!pid) return false;
    if (rec.listPageIdUsed) return pid === rec.listPageIdUsed;
    return !!(TARGET.menuItemId && pid.indexOf(TARGET.menuItemId) === 0);
  }

  function isOrgLoadData(r) {
    if (!r || !r.query || r.query.ac !== "loadData") return false;
    if (!r.response || r.response.length <= 8 || isTimeoutPayload(r.response)) return false;
    var f = r.query.f;
    if (!f || isReservedForm(f)) return false;
    if (isListPageId(r.pageId)) return true;
    if (TARGET.dataFormId) return f === TARGET.dataFormId;
    var s = String(r.response);
    return (
      s.indexOf("billlistap") >= 0 ||
      s.indexOf("addNodes") >= 0 ||
      s.indexOf("updateNodes") >= 0 ||
      /"k"\s*:\s*"[^"]*tree/i.test(s) ||
      s.indexOf('"nodes"') >= 0
    );
  }

  function maybeCaptureOrg(q, text, pageId) {
    if (!text || String(text).length < 80) return;
    if (!q || q.ac !== "loadData") return;
    if (isReservedForm(q.f)) return;
    var fake = { query: q, response: text, pageId: pageId || "" };
    if (!isOrgLoadData(fake) && q.f !== TARGET.dataFormId && String(text).indexOf("addNodes") < 0) return;
    try {
      var data = extractOrgData(text);
      var prevCount = rec.orgTreeRows && rec.orgTreeRows.length ? rec.orgTreeRows.length : 0;
      if (!data.treeRowCount && !data.rows.length) return;
      if ((data.treeRowCount || 0) < prevCount) return;
      rec.orgRows = data.rows;
      rec.orgColumns = data.columns;
      rec.orgTree = data.tree;
      rec.orgTreeRows = data.treeRows || [];
      rec.discoveredFormId = TARGET.dataFormId;
      rec.discoveredAppId = TARGET.dataAppId;
      var treeHint = data.treeRowCount ? "，树节点 " + data.treeRowCount : "";
      setStatus(
        "党组织 列表 " +
          (data.rows.length || 0) +
          " 行" +
          treeHint +
          "，formId=" +
          TARGET.dataFormId +
          "，可 __cqOrgRec.copy()"
      );
    } catch (eCap) {}
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
      if (isRecorderUi(el)) continue;
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

  function findOrgMenu() {
    var texts = TARGET.menuTexts || [];
    for (var i = 0; i < texts.length; i++) {
      var el = findClickTarget(texts[i]);
      if (el) return { el: el, text: texts[i] };
    }
    return null;
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

  function setStatus(msg) {
    rec.status = msg || "";
    console.log(TAG, msg);
    var el = document.getElementById("cq-org-status");
    if (!el) {
      el = document.createElement("div");
      el.id = "cq-org-status";
      el.style.cssText =
        "position:fixed;right:12px;bottom:12px;z-index:2147483645;background:#111;color:#fff;padding:8px 12px;border-radius:8px;font:12px/1.4 sans-serif;max-width:420px;box-shadow:0 6px 20px rgba(0,0,0,.25);";
      try {
        document.body.appendChild(el);
      } catch (e) {
        return;
      }
    }
    el.textContent = "[cq-org] " + rec.status;
  }

  var fetching = false;
  function fetchOrg() {
    if (fetching) return fetching;
    rec.orgError = null;
    var startedAt = Date.now();
    function afterStart(r) {
      if (!r || !r.t) return false;
      var ts = Date.parse(r.t);
      return !isNaN(ts) && ts >= startedAt - 300;
    }
    setStatus("开始拉党组织查询：点应用 → 点党费 → 打开党组织查询 → 读 loadData");
    fetching = Promise.resolve()
      .then(function () {
        var consolePageId = latestConsolePageId();
        var suffix = pickSuffix();
        if (!consolePageId || !suffix) {
          throw new Error("还没有主控台 pageId（root…）。等主控台加载完再执行 __cqOrgRec.fetchOrg()");
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
            return isOrgLoadData(r);
          }, 25000).then(function (r) {
            rememberListReq(r);
            return r;
          });
        }

        function treeMenuThenLoad() {
          setStatus("请求 treeMenuClick，等待党组织 loadData");
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
            var hit = findOrgMenu();
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
        var data = extractOrgData(payload);
        if (!data.treeRowCount) {
          for (var i = rec.requests.length - 1; i >= 0; i--) {
            var r = rec.requests[i];
            if (!isOrgLoadData(r)) continue;
            rememberListReq(r);
            var next = extractOrgData(r.response);
            if (
              (next.treeRowCount || 0) > (data.treeRowCount || 0) ||
              (!data.rows.length && next.rows.length)
            ) {
              data = next;
              payload = r.response;
            }
            if (data.treeRowCount) break;
          }
        }
        if (
          rec.orgTreeRows &&
          rec.orgTreeRows.length &&
          rec.orgTreeRows.length > (data.treeRowCount || 0)
        ) {
          data = {
            rows: rec.orgRows && rec.orgRows.length ? rec.orgRows : data.rows,
            columns: rec.orgColumns && rec.orgColumns.length ? rec.orgColumns : data.columns,
            tree: rec.orgTree,
            treeRows: rec.orgTreeRows,
            treeRowCount: rec.orgTreeRows.length,
          };
        }
        rec.orgRows = data.rows;
        rec.orgColumns = data.columns;
        rec.orgTree = data.tree;
        rec.orgTreeRows = data.treeRows || [];
        rec.orgRawPreview = clip(typeof payload === "string" ? payload : JSON.stringify(payload), 2000);
        var formHint = TARGET.dataFormId ? "，formId=" + TARGET.dataFormId : "";
        var treeHint = data.treeRowCount ? "，树节点 " + data.treeRowCount : "";
        var listHint = data.rows.length ? "列表 " + data.rows.length + " 行" : "列表 0 行";
        setStatus(
          "党组织 " +
            listHint +
            treeHint +
            formHint +
            (data.treeRowCount || data.rows.length ? "，可 __cqOrgRec.copy()" : "，未解析到行")
        );
        if (data.columns && data.columns.length) console.log(TAG, "列", data.columns);
        if (data.treeRowCount) console.log(TAG, "树节点", data.treeRowCount, "（含党小组等下级）");
        if (data.treeRows && data.treeRows.length) console.table(data.treeRows.slice(0, 20));
        else if (data.rows.length) console.table(data.rows.slice(0, 20));
        else console.log(TAG + " 未解析到行，预览", rec.orgRawPreview);
        return data.treeRows && data.treeRows.length ? data.treeRows : data.rows;
      })
      .then(
        function (rows) {
          fetching = false;
          return rows;
        },
        function (err) {
          fetching = false;
          rec.orgError = String(err && err.message ? err.message : err);
          setStatus("拉数失败：" + rec.orgError);
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
      setStatus("开始自动拉党组织查询");
      fetchOrg();
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
      consolePageIdUsed: rec.consolePageIdUsed || "",
      menuPageIdUsed: rec.menuPageIdUsed || "",
      listPageIdUsed: rec.listPageIdUsed || "",
      discoveredFormId: rec.discoveredFormId || TARGET.dataFormId || "",
      discoveredAppId: rec.discoveredAppId || TARGET.dataAppId || "",
      hookedWindowCount: rec._hooked.length,
      hasJQuery: !!(window.jQuery || window.$),
      requestCount: rec.requests.length,
      opCount: rec.ops.length,
      orgError: rec.orgError,
      orgRowCount: rec.orgRows ? rec.orgRows.length : 0,
      orgTreeRowCount: rec.orgTreeRows ? rec.orgTreeRows.length : 0,
      orgColumns: rec.orgColumns,
      orgRows: rec.orgRows,
      orgTree: rec.orgTree,
      orgTreeRows: rec.orgTreeRows,
      orgRawPreview: rec.orgRawPreview,
      note: fetching
        ? "仍在拉数，请等控制台出现「党组织…行」或右下角状态变化后再 copy"
        : !rec.orgRows && !rec.orgError
          ? "尚未开始或尚未结束拉数。请等右下角状态，或执行 __cqOrgRec.fetchOrg()"
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
    var id = "cq-org-copy-panel";
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
        if (win.fetch && win.fetch.__orig && win.fetch.__cqOrgRec) win.fetch = win.fetch.__orig;
      } catch (e) {}
    });
    if (window.__cqOrgRec) window.__cqOrgRec._alive = false;
    console.log(TAG + " 已停止记录（无法完整卸载 XHR/jQuery hook，刷新页面即可清除）");
  }

  function help() {
    console.log(
      [
        TAG + " 命令",
        "  __cqOrgRec.copy()           复制请求/操作/党组织列表 + 完整树",
        "  __cqOrgRec.download()       下载 cq-org-rec.json",
        "  __cqOrgRec.fetchOrg()       点「应用/党费/党组织查询」走官方会话，再解析 loadData",
        "  __cqOrgRec.autoFetch = false  禁止登录后自动拉数",
        "  __cqOrgRec.stop()           停止记录",
        "粘贴后请保持 Context 在顶层主控台。右下角出现「党组织…行」后再 copy。",
      ].join("\n")
    );
  }

  var api = {
    help: help,
    fetchOrg: fetchOrg,
    copy: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      showCopy(json, "记录 JSON：文本框内 Ctrl+C");
      return json;
    },
    download: function () {
      var json = JSON.stringify(snapshot(), null, 2);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "cq-org-rec.json";
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
  Object.defineProperty(api, "orgRows", {
    get: function () {
      return rec.orgRows;
    },
  });
  Object.defineProperty(api, "orgColumns", {
    get: function () {
      return rec.orgColumns;
    },
  });
  Object.defineProperty(api, "orgTree", {
    get: function () {
      return rec.orgTree;
    },
  });
  Object.defineProperty(api, "orgTreeRows", {
    get: function () {
      return rec.orgTreeRows;
    },
  });
  window.__cqOrgRec = api;

  walkHook(window);
  setInterval(function () {
    if (rec._alive) walkHook(window);
  }, 2000);

  try {
    rec.href = location.href;
  } catch (e) {}
  setStatus("已挂钩。主控台 pageId 就绪后会自动拉党组织查询，请勿立刻 copy");
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
    else setStatus("未找到主控台 pageId，请执行 __cqOrgRec.fetchOrg()");
  }
  bootAuto();
  return window.__cqOrgRec;
})();
