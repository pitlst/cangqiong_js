/**
 * 苍穹官方前端脚本（单文件）
 *
 * 当前环境结论（配置项-新页面 / Cosmic UI）：
 *   有 KDApi + jQuery，没有 FormPlugin。
 *   本页改值请走自定义控件 model.invoke → 后端 customEvent；
 *   美化请用已开放的 kd-cq-* class。业务单据的 setValue 需打开单据页再探测。
 *
 * 用法：单据或配置页 → F12 → Context 选 commonpage / 单据 iframe → 粘贴本文件。
 *
 * 命令：
 *   window.__cq.probe()
 *   window.__cq.copy()       完整 JSON 写入剪贴板（推荐回传）
 *   window.__cq.download()   下载 cq-probe.json
 *   window.__cq.dump(1500)   分段打印，避免控制台截断
 *   window.__cq.help()
 */
(function () {
  var TAG = "[苍穹官方脚本]";

  window.__CQ_FILL__ = window.__CQ_FILL__ || {
    defaults: {},
    linkage: {},
    css: [
      "/* Cosmic 新 UI 开放 class 预览，仅微调，避免改未开放内部 class */",
      ".kd-cq-control { box-sizing: border-box; }",
      ".kd-cq-flexpanel { gap: 8px; }",
      ".kd-cq-btn { border-radius: 6px; }",
      ".kd-collapse-panel-header { font-weight: 600; }",
      ".kd-cq-toolbar-item { letter-spacing: 0.02em; }",
    ].join("\n"),
  };

  function logGroup(title, payload) {
    console.groupCollapsed(TAG + " " + title);
    if (payload !== undefined) console.log(payload);
    console.groupEnd();
  }

  function listFnKeys(obj, limit) {
    if (!obj) return [];
    var keys = [];
    try {
      var cur = obj;
      var seen = {};
      while (cur && cur !== Object.prototype && keys.length < (limit || 80)) {
        Object.getOwnPropertyNames(cur).forEach(function (k) {
          if (seen[k]) return;
          seen[k] = true;
          try {
            if (typeof obj[k] === "function") keys.push(k);
          } catch (e) {}
        });
        cur = Object.getPrototypeOf(cur);
      }
    } catch (e) {
      return ["<读取失败: " + e.message + ">"];
    }
    return keys.sort();
  }

  function safeHref(win) {
    try {
      return win.location.href;
    } catch (e) {
      return "<跨域不可读: " + e.message + ">";
    }
  }

  function parseOfficialParams(win) {
    var out = {};
    try {
      var url = new URL(win.location.href);
      [
        "formId",
        "billFormId",
        "pkId",
        "billno",
        "billNo",
        "appId",
        "pageId",
        "byPageId",
        "isCosmicUI",
        "entryId",
        "type",
        "status",
      ].forEach(function (k) {
        var v = url.searchParams.get(k);
        if (v) out[k] = v;
      });
      out.pathname = url.pathname;
      out.hash = url.hash || "";
    } catch (e) {
      out.error = e.message;
    }
    return out;
  }

  function collectSameOriginWindows(root) {
    var list = [];
    var seen = [];
    function add(label, win) {
      if (!win) return;
      for (var i = 0; i < seen.length; i++) {
        if (seen[i] === win) return;
      }
      seen.push(win);
      list.push({ label: label, win: win });
    }
    add("current", root);
    try {
      if (root.parent && root.parent !== root) {
        void root.parent.location.href;
        add("parent", root.parent);
      }
    } catch (e) {
      list.push({ label: "parent", win: null, skipped: "跨域: " + e.message });
    }
    try {
      if (root.top && root.top !== root) {
        void root.top.location.href;
        add("top", root.top);
      }
    } catch (e) {
      list.push({ label: "top", win: null, skipped: "跨域: " + e.message });
    }
    function walk(win, prefix) {
      var frames;
      try {
        frames = win.frames;
      } catch (e) {
        return;
      }
      for (var i = 0; i < frames.length; i++) {
        var child = frames[i];
        var label = prefix + "/iframe[" + i + "]";
        try {
          void child.location.href;
          add(label, child);
          walk(child, label);
        } catch (e) {
          list.push({ label: label, win: null, skipped: "跨域: " + e.message });
        }
      }
    }
    walk(root, "current");
    try {
      if (root.top && root.top !== root) walk(root.top, "top");
    } catch (e) {}
    return list;
  }

  function inspectKdApiDeep(win) {
    var api = win.KDApi;
    if (!api) return { present: false };
    var out = {
      present: true,
      fnKeys: listFnKeys(api, 80),
      ownKeys: Object.keys(api),
    };
    out.nameSpaceNote =
      "getNameSpace / nameSpace 必须在自定义控件 model 上下文中调用，设计器页直接调会报 model undefined，已跳过";
    try {
      if (typeof api.getThemeObj === "function") {
        var theme = api.getThemeObj();
        out.themeType = typeof theme;
        out.themeKeys =
          theme && typeof theme === "object" ? Object.keys(theme).slice(0, 40) : [];
      }
    } catch (e) {
      out.themeError = e.message;
    }
    try {
      if (typeof api.getLangObj === "function") {
        var lang = api.getLangObj();
        out.langType = typeof lang;
        out.langKeyCount =
          lang && typeof lang === "object" ? Object.keys(lang).length : 0;
      }
    } catch (e) {
      out.langError = e.message;
    }
    return out;
  }

  function inspectOfficialApis(win) {
    var api = {
      KDApi: typeof win.KDApi,
      FormPlugin: typeof win.FormPlugin,
      KDPluginExtend: typeof win.KDPluginExtend,
      afterLoaded: typeof win.afterLoaded,
      jQuery: typeof win.jQuery,
      $: typeof win.$,
    };
    var detail = {};
    if (win.KDApi) detail.kdApi = inspectKdApiDeep(win);
    if (win.KDPluginExtend) {
      detail.KDPluginExtendKeys = Object.keys(win.KDPluginExtend);
      detail.KDPluginExtendFn = listFnKeys(win.KDPluginExtend, 40);
    }
    if (typeof win.FormPlugin === "function") {
      detail.FormPluginHint =
        "可 new FormPlugin({ afterBindData, propertyChanged, afterCreateNewData })";
    }
    return { api: api, detail: detail };
  }

  function collectOpenCssHints(doc) {
    if (!doc || !doc.querySelectorAll) return { classes: [], fieldKeys: [] };
    var classCount = {};
    var fieldKeys = {};
    try {
      var nodes = doc.querySelectorAll("[class]");
      var maxNodes = Math.min(nodes.length, 4000);
      for (var i = 0; i < maxNodes; i++) {
        var el = nodes[i];
        String(el.className)
          .split(/\s+/)
          .filter(Boolean)
          .forEach(function (c) {
            if (/^(kd|kdf|kdc|cosmic|form)/i.test(c)) {
              classCount[c] = (classCount[c] || 0) + 1;
            }
          });
        ["data-key", "data-field", "data-fieldkey", "data-id", "kd-key"].forEach(
          function (attr) {
            var v = el.getAttribute(attr);
            if (v && v.length < 80) fieldKeys[attr + "=" + v] = true;
          }
        );
      }
    } catch (e) {
      return { error: e.message, classes: [], fieldKeys: [] };
    }
    var classes = Object.keys(classCount)
      .sort(function (a, b) {
        return classCount[b] - classCount[a];
      })
      .slice(0, 40)
      .map(function (c) {
        return c + " (" + classCount[c] + ")";
      });
    return { classes: classes, fieldKeys: Object.keys(fieldKeys).slice(0, 80) };
  }

  function textOf(el, max) {
    if (!el) return "";
    var t = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
    return t.slice(0, max || 40);
  }

  function detectDesigner(win) {
    var doc = win.document;
    if (!doc) return { isDesigner: false };
    var titles = [];
    doc.querySelectorAll("[title], .kd-cq-btn").forEach(function (el) {
      var t = el.getAttribute("title") || textOf(el, 12);
      if (t) titles.push(t);
    });
    var hasJs = titles.indexOf("JS") >= 0;
    var hasPreview = titles.indexOf("预览") >= 0;
    var tabs = [];
    doc.querySelectorAll(".kd-tab-pane-text").forEach(function (el) {
      var t = textOf(el, 20);
      if (t) tabs.push(t);
    });
    var tabText = tabs.join(",");
    var isDesigner =
      hasJs &&
      hasPreview &&
      (tabText.indexOf("大纲") >= 0 || tabText.indexOf("实体") >= 0 || tabText.indexOf("控件") >= 0);
    return {
      isDesigner: isDesigner,
      buttons: ["JS", "XML", "历史", "预览", "保存"].filter(function (t) {
        return titles.indexOf(t) >= 0;
      }),
      customControlOnCanvas: !!(doc.getElementById("customcontrolap") || doc.querySelector(".kd-cq-custom")),
      placeholderId: doc.getElementById("phap1") ? "phap1" : "",
      tabDesignerId: doc.getElementById("tabdesigners") ? "tabdesigners" : "",
      tabs: tabs.slice(0, 16),
    };
  }

  function formPluginSnippet() {
    return [
      "/**",
      " * 粘贴到设计器顶部【JS】面板，保存后点【预览】验证。",
      " * 列表已见列名：单据编号、单据状态、配置json、党组织",
      " * 请在大纲点「显示标识」后，把真实字段标识填进 defaults",
      " */",
      "window.__CQ_FILL__ = window.__CQ_FILL__ || {",
      "  defaults: {",
      "    // 例：单据编号字段标识: \"预览页会打印真实 key\",",
      "  },",
      "  linkage: {",
      "    // warehouse: { target: \"location\", value: \"\" },",
      "  }",
      "};",
      "",
      "var plugin = new FormPlugin({",
      "  afterCreateNewData: function () {",
      "    var cfg = window.__CQ_FILL__ || {};",
      "    var defaults = cfg.defaults || {};",
      "    var keys = Object.keys(defaults);",
      "    if (!keys.length) return;",
      "    var self = this;",
      "    keys.forEach(function (key) {",
      "      self.getModel().setValue(key, defaults[key]);",
      "    });",
      "    this.getView().showMessage(\"已写入新增默认值\");",
      "  },",
      "  afterBindData: function () {",
      "    var keys = [];",
      "    try {",
      "      var dt = this.getModel().getDataEntityType();",
      "      var props = dt.getFields ? dt.getFields() : dt.getProperties();",
      "      var n = props.size ? props.size() : props.length;",
      "      for (var i = 0; i < n; i++) {",
      "        var p = props.get ? props.get(i) : props[i];",
      "        keys.push(p.getName ? p.getName() : String(p));",
      "      }",
      "    } catch (err) {",
      "      keys.push(\"metaError:\" + err.message);",
      "    }",
      "    console.log(\"[苍穹JS] afterBindData 字段标识\", keys);",
      "  },",
      "  propertyChanged: function (e) {",
      "    var key = e.getProperty().getName();",
      "    var row = e.getChangeSet() && e.getChangeSet()[0] ? e.getChangeSet()[0].getRowIndex() : -1;",
      "    var val = this.getModel().getValue(key, row >= 0 ? row : undefined);",
      "    console.log(\"[苍穹JS] propertyChanged\", key, row, val);",
      "    var rule = ((window.__CQ_FILL__ || {}).linkage || {})[key];",
      "    if (!rule) return;",
      "    var next = typeof rule.value === \"function\" ? rule.value(val, this) : rule.value;",
      "    this.getModel().setValue(rule.target, next, row >= 0 ? row : undefined);",
      "    this.getView().updateView(rule.target);",
      "  }",
      "});",
    ].join("\n");
  }

  function inventoryCosmic(win) {
    var doc = win.document;
    if (!doc || !doc.querySelectorAll) return { error: "无 document" };
    var designer = detectDesigner(win);
    var named = [];
    doc.querySelectorAll("[id]").forEach(function (el) {
      if (!el.id) return;
      if (!/(kd-cq-control|kd-cq-btn|kd-cq-custom|kd-cq-placeholder|kd-cq-tabs)/.test(el.className || "")) return;
      named.push({
        id: el.id,
        cls: String(el.className)
          .split(/\s+/)
          .filter(function (c) {
            return /^kd-cq/.test(c);
          })
          .slice(0, 5)
          .join(" "),
        text: textOf(el, 24),
        title: el.getAttribute("title") || "",
      });
    });
    var toolbar = [];
    doc.querySelectorAll(".kd-cq-toolbar-item").forEach(function (el) {
      var t = textOf(el, 16);
      if (t) toolbar.push({ id: el.id || "", text: t });
    });
    return {
      designer: designer,
      namedControls: named.slice(0, 40),
      toolbar: toolbar.slice(0, 30),
      collapseHeaders: Array.prototype.slice
        .call(doc.querySelectorAll(".kd-collapse-panel-header"), 0, 20)
        .map(function (el) {
          return textOf(el, 40);
        })
        .filter(Boolean),
    };
  }

  function inspectOne(item) {
    if (!item.win) return { label: item.label, skipped: item.skipped };
    var win = item.win;
    var doc = win.document;
    var official = inspectOfficialApis(win);
    var hasOfficial =
      official.api.KDApi === "object" ||
      official.api.FormPlugin === "function" ||
      official.api.KDPluginExtend === "object";
    var params = parseOfficialParams(win);
    return {
      label: item.label,
      href: safeHref(win),
      title: doc && doc.title,
      officialParams: params,
      isCosmicUI: params.isCosmicUI === "true" || /isCosmicUI=true/.test(safeHref(win)),
      isDesigner: detectDesigner(win).isDesigner,
      officialApis: official.api,
      officialDetail: official.detail,
      hasOfficial: hasOfficial,
      cssHints: collectOpenCssHints(doc),
      inventory: inventoryCosmic(win),
    };
  }

  function loadCss(win, cssText) {
    var doc = win.document;
    var id = "cq-official-extend-css";
    var old = doc.getElementById(id);
    if (old) old.remove();
    var style = doc.createElement("style");
    style.id = id;
    style.type = "text/css";
    style.appendChild(doc.createTextNode(cssText || window.__CQ_FILL__.css || ""));
    (doc.head || doc.documentElement).appendChild(style);
  }

  function createFormPluginHandlers() {
    return {
      afterCreateNewData: function () {
        var cfg = window.__CQ_FILL__ || {};
        if (!cfg.defaults) return;
        var self = this;
        Object.keys(cfg.defaults).forEach(function (key) {
          self.getModel().setValue(key, cfg.defaults[key]);
        });
        this.getView().showMessage("已按模板写入新增默认值");
      },
      afterBindData: function () {
        var model = this.getModel();
        var view = this.getView();
        var entityId = "";
        try {
          entityId = view.getEntityId ? view.getEntityId() : "";
        } catch (e) {}
        var keys = [];
        try {
          var dt = model.getDataEntityType && model.getDataEntityType();
          var props =
            dt &&
            (dt.getFields ? dt.getFields() : dt.getProperties && dt.getProperties());
          if (props) {
            var n = props.size ? props.size() : props.length;
            for (var i = 0; i < n; i++) {
              var p = props.get ? props.get(i) : props[i];
              keys.push(p.getName ? p.getName() : String(p));
            }
          }
        } catch (e) {
          keys.push("<读取字段元数据失败: " + e.message + ">");
        }
        console.log(TAG + " FormPlugin afterBindData", {
          entityId: entityId,
          fieldKeys: keys.slice(0, 120),
        });
      },
      propertyChanged: function (e) {
        var key = e.getProperty().getName();
        var changeSet = e.getChangeSet();
        var rowIndex = changeSet && changeSet[0] ? changeSet[0].getRowIndex() : -1;
        var value = this.getModel().getValue(
          key,
          rowIndex >= 0 ? rowIndex : undefined
        );
        console.log(TAG + " FormPlugin propertyChanged", {
          key: key,
          rowIndex: rowIndex,
          value: value,
        });
        var rules = (window.__CQ_FILL__ || {}).linkage || {};
        if (rules[key]) {
          var rule = rules[key];
          this.getModel().setValue(
            rule.target,
            typeof rule.value === "function" ? rule.value(value, this) : rule.value,
            rowIndex >= 0 ? rowIndex : undefined
          );
          this.getView().updateView(rule.target);
        }
      },
    };
  }

  function createCustomControl(schemeId) {
    schemeId = schemeId || "cq-fill-assist";
    function MyComponent(model) {
      this.model = model;
    }
    MyComponent.prototype.init = function () {
      console.log(TAG + " 自定义控件 init", {
        schemeId: schemeId,
        modelKeys: this.model ? Object.keys(this.model) : [],
      });
      if (this.model && this.model.dom) {
        this.model.dom.innerHTML =
          '<div class="kd-cq-control" style="padding:8px">填报辅助控件已加载</div>';
      }
    };
    MyComponent.prototype.update = function (props) {
      console.log(TAG + " 自定义控件 update", props);
    };
    MyComponent.prototype.destroyed = function () {};
    MyComponent.prototype.invoke = function (eventName, data) {
      if (this.model && typeof this.model.invoke === "function") {
        this.model.invoke(eventName, data);
      }
    };
    return { schemeId: schemeId, Component: MyComponent };
  }

  function installExtend(win) {
    win = win || window;
    if (!win.__cqExtendInstalled) {
      var prev = win.afterLoaded;
      win.afterLoaded = function () {
        if (typeof prev === "function") {
          try {
            prev.apply(this, arguments);
          } catch (e) {
            console.warn(TAG + " 原 afterLoaded 执行失败", e);
          }
        }
        loadCss(win, (window.__CQ_FILL__ || {}).css);
      };
      win.__cqExtendInstalled = true;
    }
    win.KDPluginExtend = win.KDPluginExtend || {};
    win.KDPluginExtend.ping = function (data, callback) {
      console.log(TAG + " KDPluginExtend.ping", data);
      if (typeof callback === "function") {
        callback({ success: true, data: { ok: true, time: Date.now() } });
      }
    };
    try {
      loadCss(win, (window.__CQ_FILL__ || {}).css);
    } catch (e) {
      console.warn(TAG + " 预览注入 CSS 失败", e);
    }
    console.log(TAG + " 已安装页面扩展（CSS / KDPluginExtend.ping）");
    return {
      afterLoaded: typeof win.afterLoaded,
      KDPluginExtendKeys: Object.keys(win.KDPluginExtend),
    };
  }

  function installFormPlugin(win) {
    win = win || window;
    if (typeof win.FormPlugin !== "function") {
      console.warn(
        TAG +
          " 当前页没有 FormPlugin（Cosmic 配置页常见）。请打开业务单据再探测，或把 handlers 注册到表单设计器前端脚本。"
      );
      return null;
    }
    var plugin = new win.FormPlugin(createFormPluginHandlers());
    console.log(TAG + " 已 new FormPlugin。若表单已打开，平台可能不会补绑，需刷新单据或改在设计器注册。");
    return plugin;
  }

  function registerCustomControl(schemeId) {
    if (typeof window.KDApi !== "object" || typeof window.KDApi.register !== "function") {
      console.warn(TAG + " 没有 KDApi.register");
      return null;
    }
    var pack = createCustomControl(schemeId);
    window.KDApi.register(pack.schemeId, pack.Component);
    console.log(
      TAG +
        " 已 KDApi.register('" +
        pack.schemeId +
        "')。控件要出现在页面上，还需在表单设计器拖入自定义控件并绑定同名方案 id。"
    );
    return pack.schemeId;
  }

  function buildNextSteps(report) {
    var steps = [];
    var designer = report.windows.some(function (w) {
      return w.isDesigner || (w.inventory && w.inventory.designer && w.inventory.designer.isDesigner);
    });
    var hasFormPlugin = report.windows.some(function (w) {
      return w.officialApis && w.officialApis.FormPlugin === "function";
    });
    var hasKdApi = report.windows.some(function (w) {
      return w.officialApis && w.officialApis.KDApi === "object";
    });
    if (designer) {
      steps.push("本页是表单设计器，不是单据运行页，所以没有 FormPlugin。");
      steps.push("官方入口：顶部【JS】。执行 window.__cq.copyJs()，粘贴到 JS 面板，保存后点【预览】。");
      steps.push("画布已有 customcontrolap：可绑自定义控件方案，KDApi.register + model.invoke。");
      steps.push("字段标识：大纲点「显示标识」；预览页控制台会打印 afterBindData 字段列表。");
      return steps;
    }
    if (!hasKdApi && !hasFormPlugin) {
      steps.push("未发现官方 API，请切换控制台 Context 后再 probe。");
    }
    if (hasFormPlugin) {
      steps.push("发现 FormPlugin，可用 this.getModel().setValue(字段, 值)。");
    }
    if (hasKdApi) {
      steps.push("本页可用 KDApi.register / model.invoke（自定义控件）。");
    }
    return steps;
  }

  function probe(root) {
    root = root || window;
    var report = {
      time: new Date().toISOString(),
      hint: "控制台会截断长 JSON。请执行 window.__cq.copy() 后直接粘贴，或 window.__cq.download()",
    };
    var windows = collectSameOriginWindows(root);
    report.windows = windows.map(inspectOne);
    var best =
      report.windows.filter(function (w) {
        return w.hasOfficial && w.officialApis && w.officialApis.FormPlugin === "function";
      })[0] ||
      report.windows.filter(function (w) {
        return w.hasOfficial && w.label === "current";
      })[0] ||
      report.windows.filter(function (w) {
        return w.hasOfficial;
      })[0] ||
      report.windows[0];
    report.recommendedContext = best && best.label;
    report.nextSteps = buildNextSteps(report);
    return report;
  }

  function toJson(obj) {
    return JSON.stringify(obj, null, 2);
  }

  function dumpChunks(text, size) {
    size = size || 1500;
    var total = Math.ceil(text.length / size) || 1;
    console.log(TAG + " JSON 分段 " + total + " 段，每段 " + size + " 字，请按 PART 顺序拼接");
    for (var i = 0; i < total; i++) {
      var part = text.slice(i * size, (i + 1) * size);
      console.log("----- CQ_JSON_PART " + (i + 1) + "/" + total + " BEGIN -----");
      console.log(part);
      console.log("----- CQ_JSON_PART " + (i + 1) + "/" + total + " END -----");
    }
    return total;
  }

  function showCopyPanel(text, title) {
    var id = "cq-official-copy-panel";
    var old = document.getElementById(id);
    if (old) old.remove();
    var wrap = document.createElement("div");
    wrap.id = id;
    wrap.setAttribute("role", "dialog");
    wrap.style.cssText =
      "position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:24px;";
    wrap.innerHTML =
      '<div style="width:min(920px,100%);max-height:86vh;background:#fff;color:#111;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.25);display:flex;flex-direction:column;">' +
      '<div style="padding:12px 16px;border-bottom:1px solid #e5e5e5;font:600 14px/1.4 sans-serif;">' +
      (title || "请在文本框内 Ctrl+C 复制") +
      "</div>" +
      '<textarea readonly style="flex:1;min-height:360px;margin:12px 16px;padding:10px;font:12px/1.5 ui-monospace,Consolas,monospace;border:1px solid #d0d0d0;border-radius:6px;resize:vertical;"></textarea>' +
      '<div style="padding:0 16px 14px;display:flex;gap:8px;justify-content:flex-end;">' +
      '<button type="button" data-act="select" style="height:32px;padding:0 12px;border:1px solid #d0d0d0;border-radius:6px;background:#fff;cursor:pointer;">全选</button>' +
      '<button type="button" data-act="download" style="height:32px;padding:0 12px;border:1px solid #d0d0d0;border-radius:6px;background:#fff;cursor:pointer;">下载</button>' +
      '<button type="button" data-act="close" style="height:32px;padding:0 12px;border:0;border-radius:6px;background:#c62828;color:#fff;cursor:pointer;">关闭</button>' +
      "</div></div>";
    var ta = wrap.querySelector("textarea");
    ta.value = text;
    function close() {
      wrap.remove();
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    wrap.addEventListener("click", function (e) {
      if (e.target === wrap) close();
    });
    wrap.querySelector('[data-act="close"]').onclick = close;
    wrap.querySelector('[data-act="select"]').onclick = function () {
      ta.focus();
      ta.select();
    };
    wrap.querySelector('[data-act="download"]').onclick = function () {
      downloadJson(text, title && /JS/.test(title) ? "cangqiong-form-plugin.js" : "cq-probe.json");
    };
    document.body.appendChild(wrap);
    setTimeout(function () {
      ta.focus();
      ta.select();
    }, 0);
    document.addEventListener("keydown", onKey);
    console.log(TAG + " 已弹出复制面板，在文本框按 Ctrl+C，Esc 关闭");
    return wrap;
  }

  function copyText(text, title) {
    showCopyPanel(text, title);
    return Promise.resolve(true);
  }

  function downloadJson(text, filename) {
    var blob = new Blob([text], { type: "application/json;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename || "cq-probe.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    console.log(TAG + " 已触发下载 " + (filename || "cq-probe.json"));
  }

  function printSummary(report) {
    console.log("%c" + TAG + " 探测完成（请用 copy/download 回传，勿复制被截断的长 JSON）", "color:#0a7;font-weight:700");
    console.log(TAG + " 推荐 Context：" + report.recommendedContext);
    (report.nextSteps || []).forEach(function (s, i) {
      console.log(TAG + " 下一步[" + (i + 1) + "] " + s);
    });
    (report.windows || []).forEach(function (w) {
      console.log(TAG + " ---- " + w.label + " ----");
      console.log(TAG + " title: " + w.title);
      console.log(TAG + " href: " + w.href);
      console.log(TAG + " params: " + toJson(w.officialParams || {}));
      console.log(TAG + " apis: " + toJson(w.officialApis || {}));
      var kd = w.officialDetail && w.officialDetail.kdApi;
      if (kd) {
        console.log(TAG + " KDApi.fnKeys: " + (kd.fnKeys || []).join(", "));
        console.log(TAG + " KDApi.themeKeys: " + (kd.themeKeys || []).join(", "));
        if (kd.nameSpaceNote) console.log(TAG + " KDApi.nameSpace: " + kd.nameSpaceNote);
      }
      var inv = w.inventory || {};
      var dsg = inv.designer || {};
      console.log(TAG + " isDesigner: " + !!w.isDesigner);
      console.log(TAG + " designer.buttons: " + (dsg.buttons || []).join(" | "));
      console.log(TAG + " designer.tabs: " + (dsg.tabs || []).join(" | "));
      console.log(TAG + " customControlOnCanvas: " + dsg.customControlOnCanvas);
      console.log(TAG + " collapseHeaders: " + (inv.collapseHeaders || []).join(" | "));
      if (inv.namedControls && inv.namedControls.length) {
        console.log(TAG + " namedControls");
        console.table(inv.namedControls);
      }
      if (inv.toolbar && inv.toolbar.length) {
        console.log(TAG + " toolbar");
        console.table(inv.toolbar);
      }
      console.log(TAG + " css classes: " + ((w.cssHints && w.cssHints.classes) || []).join(" | "));
    });
    console.log(TAG + " 设计器回传后下一步：window.__cq.copyJs() → 点顶部【JS】粘贴 → 保存 →【预览】");
    console.log(TAG + " 回传探测数据：window.__cq.copy()  或  window.__cq.download()");
  }

  function printReport(report) {
    printSummary(report);
  }

  window.__cq = {
    report: null,
    probe: function () {
      this.report = probe(window);
      printReport(this.report);
      return this.report;
    },
    reprint: function () {
      printSummary(this.report);
      return this.report;
    },
    copy: function () {
      return copyText(toJson(this.report), "探测 JSON：文本框内 Ctrl+C");
    },
    copyJs: function () {
      var code = formPluginSnippet();
      console.log(TAG + " FormPlugin 脚本已在页面弹出，Ctrl+C 后粘贴到设计器【JS】");
      console.log(code);
      return copyText(code, "设计器【JS】脚本：文本框内 Ctrl+C，然后粘贴到 JS 面板");
    },
    jsSnippet: formPluginSnippet,
    download: function () {
      downloadJson(toJson(this.report), "cq-probe.json");
    },
    dump: function (size) {
      return dumpChunks(toJson(this.report), size || 1500);
    },
    inspectKdApi: function () {
      var info = inspectKdApiDeep(window);
      console.log(TAG + " KDApi.fnKeys: " + (info.fnKeys || []).join(", "));
      console.log(TAG + " KDApi.themeKeys: " + (info.themeKeys || []).join(", "));
      if (info.nameSpaceNote) console.log(TAG + " " + info.nameSpaceNote);
      return info;
    },
    inventory: function () {
      var info = inventoryCosmic(window);
      console.log(TAG + " designer: " + toJson(info.designer || {}));
      console.log(TAG + " collapseHeaders: " + (info.collapseHeaders || []).join(" | "));
      console.table(info.namedControls || []);
      console.table(info.toolbar || []);
      return info;
    },
    installExtend: function () {
      return installExtend(window);
    },
    installFormPlugin: function () {
      return installFormPlugin(window);
    },
    registerCustomControl: registerCustomControl,
    createFormPluginHandlers: createFormPluginHandlers,
    help: function () {
      console.log(
        [
          TAG + " 单文件命令",
          "",
          "window.__cq.probe()                 重新探测，并尝试复制完整 JSON",
          "window.__cq.copyJs()                复制 FormPlugin 脚本，粘贴到设计器【JS】面板",
          "window.__cq.copy()                  完整探测 JSON 写入剪贴板",
          "window.__cq.download()              下载 cq-probe.json",
          "window.__cq.dump()                  分段打印，避免控制台截断",
          "window.__cq.reprint()               只打摘要，不打长 JSON",
          "window.__cq.inspectKdApi()          KDApi.nameSpace / theme",
          "window.__cq.inventory()             kd-cq 控件清单",
          "window.__cq.registerCustomControl() KDApi.register（需设计器绑定方案 id）",
          "window.__cq.installExtend()         重新注入 CSS / KDPluginExtend",
        ].join("\n")
      );
    },
  };

  var report = probe(window);
  window.__cq.report = report;
  installExtend(window);
  if (typeof window.FormPlugin === "function") {
    try {
      window.__cq.plugin = installFormPlugin(window);
    } catch (e) {
      console.warn(TAG + " FormPlugin 安装失败", e);
    }
  }
  printReport(report);
  return report;
})();
