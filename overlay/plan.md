# overlay/ 重构方案（自行实施版）

## 一、现状（已勘察确认）

`index.overlay-src.js`（5511 行）实际是"源码+产物"混合体：

| 行区间 | 内容 |
|---|---|
| 3-14 | 嵌入的压缩 React 表格 bundle（embed-module.js 构建时写回，DT_BUNDLE） |
| 15-52 | iframe 创建 + doc.write 注入壳 |
| 43-1251 | CSS（shadcn 主题，~1200 行，在 doc.write 模板字符串内） |
| 1254-1473 | HTML body（6 个页签、工具栏、dt-* 表格挂载点、配置对话框，~220 行） |
| 1473-5490 | 面板逻辑（~4000 行单脚本） |

4000 行脚本内部结构（绝对行号，供提取时定位）：
- 1474-1584 日志/安全绑定：clog、errToInfo、snapshotCq、reportError、bind、unmount、syncThemeButton
- 1609-1730 页签+表格定义：STATUS/QUARTERS/ORG_TREE/TABLE_DEFS
- 1731-1836 mock 数据生成：randNo/randQuarterlyRow/randConfigRow 等
- 1895-2002 switchTab/initTabs/initTableData/refreshDataTable
- 2003-2065 提示条：makeAlertIcon/showAlert/setStatus
- 2069 waitEl（模拟官方 wait）
- 2083-2143 会话配置：CQ_DEDUCTION/CQ_PARTY/CQ_ORG + 共享状态（watchedTenantPageId/sessionWin 等）
- 2145-2519 页面 id 发现：collectPageIds/findConsolePageId/collectTenantCandidates/buildTenantTryList
- 2520-2601 点击模拟：findClickAnywhere/fireParentClick/findClickInTree
- 2607-2869 fetch 会话：makeFetchSession/openFetchFrame/hookFetchOn/pushSessReq/waitFor/cqInvoke
- 2880-3178 扣分项模块：parseDeductionTable/loadDeductionFromCq
- 3181-3886 季度党群绩效模块：openOnePartyBill/collectPartyEntries/loadPartyQuarterlyFromCq
- 3888-4308 党组织加载：mapOrgRows/buildOrgRoot/loadOrgFromCq
- 4310-4478 党组织选择器 UI：orgState/renderOrgTree/renderOrgTable/resetOrgPicker
- 4480-4742 配置单据操作：CQ_CONFIG_FIELDS/findOfficialClick/setOfficialField/selectOfficialListRow
- 4744-5165 配置类型与动态面板：CONFIG_TYPES/renderPartyPerfPanel/renderExcellencePanel/renderGrassrootsPanel/validateConfig/buildConfigJson
- 5166-5362 对话框：openConfigDialog/closeDialog
- 5363-5459 Excel 导出：buildExcelXml/exportCurrentExcel
- 5470-5490 初始化绑定：dlg 事件、keydown、initTableData/initTabs

根目录 `cangqiong-*.js`（5 个探针/记录工具）不在重构范围，保持不动。

## 二、目标目录结构

```
overlay/
├── build.mjs                  # 构建入口（唯一）：esbuild 打包 + 自解包组装 → dist/index.js
├── index.html                 # 全部 markup（原来模板里的 <body> 部分）；开发预览页
├── styles.css                 # 全部样式（原来模板里的 <style> 部分，原样搬出）
├── config.js                  # 部署配置集中：CONFIG.configFieldKey/autoSaveAfterFill、CQ_* 选择器、按钮文案
├── runtime.js                 # didMount 自解包运行时骨架（b64ToU8/inflateGzip/unpack/mountOverlay/dispose），
│                              # 从 build-didmount.js 的模板字符串抽成独立文件，构建时原样拼进产物
├── lib/
│   ├── host.js                # 宿主适配层：uiEl/uiAll/host/shadow/unmountHost
│   │                          #   开发（index.html 直开）= document.getElementById；真机 = shadow.getElementById
│   ├── logger.js              # clog/reportError/errToInfo/snapshotCq/cqDebugLog
│   ├── dom.js                 # bind/waitEl/waitUntil/fireParentClick 等 DOM 工具
│   ├── excel.js               # buildExcelXml/triggerBlobDownload/exportStamp
│   ├── cq-fetch.js            # fetch 会话：makeFetchSession/hookFetchOn/pushSessReq/openFetchFrame/cqInvoke
│   └── cq-navigate.js         # 页面 id 发现 + 点击模拟 + 菜单定位（collectPageIds/findConsolePageId/
│                              #   findClickAnywhere/findParentClickTarget/buildTenantTryList）
├── src/
│   ├── panel.js               # 入口：mount/init/dispose 生命周期、主题切换、Esc 关闭、全局暴露（__cqDisposeOverlay 等）
│   ├── state.js               # 共享可变状态集中：orgState/orgViewState/configDraft/configEditRow/
│   │                          #   watchedTenantPageId/sessionWin/deductionLoading 等（拆模块前先收敛到这里）
│   ├── tabs.js                # 页签 + TABLE_DEFS + switchTab/refreshDataTable + 表格 mount/setData 调用
│   ├── alerts.js              # makeAlertIcon/showAlert/setStatus
│   ├── org-picker.js          # 党组织树选择器（renderOrgTree/renderOrgTable/resetOrgPicker/selectedOrgNames）
│   ├── config-dialog.js       # 配置对话框 + CONFIG_TYPES + 三种动态面板渲染 + validate/buildConfigJson/parseConfigPayload
│   ├── cq-bill.js             # 苍穹配置单据操作（findOfficialClick/clickOfficialByText/setOfficialField/
│   │                          #   getOfficialField/selectOfficialListRow/状态映射）
│   ├── cq-deduction.js        # 扣分项加载 + 解析（parseDeductionTable/loadDeductionFromCq/remountDeductionTable）
│   ├── cq-party-quarterly.js  # 季度党群绩效（openOnePartyBill/collectPartyEntries/extractPartyBillData/
│   │                          #   loadPartyQuarterlyFromCq）
│   └── cq-org.js              # 党组织树/表加载（mapOrgRows/buildOrgRoot/mapCqOrgNode/loadOrgFromCq）
└── mock/
    └── data.js                # rand* mock 生成器 + 演示数据源（开发预览用）
```

数据表格模块（data-tables-module.js）**保持原文件位置**，作为 ES module 被 tabs.js import（`import { mount, setData, unmountAll } from "../data-tables-module.js"`，文件末尾改为 export 而非挂 window）。

## 三、关键设计决策（已确认）

1. **单一 Shadow DOM 运行时**：部署目标只有 didMount 注入（index.js 自解包 IIFE）。删除 iframe 路径（embed-module.js、doc.write 模板）、删除 build-didmount.js 的 transformJs 正则改写。
2. **data-tables 并入同一 bundle**：esbuild 一次打包 src/panel.js + lib/* + data-tables-module.js 成单个 IIFE。删除 dist/data-tables.bundle.js、DT_BUNDLE 字符串注入、window.__cqDataTable 全局桥、__CQ_TABLE_BOOT 调用。
3. **ES modules + esbuild**：所有模块 import/export；build.mjs 用 esbuild（target es2018、minify）打 IIFE，再复用 gzip+base64 自解包格式输出 dist/index.js。
4. **host.js 适配层**：面板代码一律 `import { uiEl, uiAll, host } from "./lib/host.js"`。开发时 uiEl = document.getElementById（index.html 直开即预览）；真机时 = shadow.getElementById。彻底消灭 `window.parent.xxx` 和裸 `document.getElementById` 直调。
5. **mock 预览**：overlay/index.html 直开（或 `python -m http.server`）即走 mock 数据完整交互；真机数据解析函数与 mock 生成器分离但共用渲染。
6. **config.js 集中部署参数**：原散落在脚本各处的 CONFIG、CQ_DEDUCTION/CQ_PARTY/CQ_ORG、按钮文案、选择器常量全部收拢，注释写明每个字段在真机上的获取方法。

## 四、新构建链

```
npm run build
 └─ node overlay/build.mjs
     ├─ esbuild：src/panel.js → dist/panel.bundle.js（IIFE, minify, es2018）
     ├─ 读取 styles.css + index.html
     ├─ 组装运行时：runtime.js 骨架 + （html/css/bundle 打包 gzip+base64）
     └─ 输出 dist/index.js（整份粘贴 didMount）
```

退役：build-tables.mjs、embed-module.js、build-didmount.js、index.overlay-src.js、dist/data-tables.bundle.js；package.json scripts 简化为 `"build": "node overlay/build.mjs"`。

## 五、分步实施（每步可验证）

- **Step 0 基线**：git 提交当前工作区（含 M index.js / M index.overlay-src.js）；真机验证一次现有 index.js 的完整功能清单，作为回归对照。
- **Step 1 机械搬迁（零逻辑改动）**：用 build-didmount.js 里现成的 extractTemplate/splitSrcdoc 思路（或临时脚本）把 CSS、body HTML、脚本三段从 doc.write 模板抽出 → overlay/styles.css、overlay/index.html、临时 script 文件。注意脚本结束标签在模板里是 `<\/script>` 转义形式。
- **Step 2 构建骨架**：写 overlay/build.mjs，能拼出与旧 index.js 行为等价的产物（先用整段拼接脚本，不做拆分），浏览器/真机验证等价。
- **Step 3 lib/ 无状态模块**：logger.js、excel.js、dom.js、cq-navigate.js、cq-fetch.js 纯搬运（函数体不动，只改引用方式）。
- **Step 4 state.js 收敛**：把所有顶层 var 分类——常量进 config.js/所属模块，可变状态进 state.js。此步是后续拆分的前提，不做会"拆一个断一片"。
- **Step 5 src/ 功能拆分**：按依赖由底向上：cq-deduction → cq-party-quarterly → cq-org → org-picker → config-dialog → cq-bill → tabs → alerts → panel。每拆完一个模块就 build + mock 预览验证。
- **Step 6 host.js 落地**：把全部 `window.parent.*`、`document.getElementById(`、`document.querySelectorAll(` 等直调改为 host.js 显式调用（见"坑"第 1 条，有些是"为正则替换而写"的代码，必须重写）。
- **Step 7 data-tables 并入**：data-tables-module.js 改 export，tabs.js import；删除全局桥与字符串注入。
- **Step 8 退役清理**：删旧脚本与中间产物，更新 package.json、DEPLOY.md（部署说明改为粘贴 dist/index.js）。

## 六、必须注意的坑

1. **被 transformJs 绑架的写法**：旧源码里有 `window.parent.document.getElementById("shadcn-hello-inject-root").remove()`（被替换成 unmountHost()）、裸 `document.getElementById(`（被全量替换成 `uiEl(`）、`document.querySelectorAll(` → `uiAll(`、`document.documentElement.classList` → `host.classList`、`window.parent.console` → `window.console`。这些代码是"为字符串替换而写"的，Step 6 必须逐处重写为显式 host.js 调用，不能原样保留。
2. **共享可变状态**：orgState、orgViewState、configDraft、configEditRow、configSelected、watchedTenantPageId、sessionWin、fetchFrameTimer、cqFetchSessions、deductionLoading/deductionReady 等大量顶层 var 被跨函数共享，Step 4 必须优先收敛，否则拆分必然断链。
3. **全局暴露契约（必须保留）**：`parentWin().__cqFetchDeduction/__cqFetchPartyQuarterly/__cqFetchOrg`、`window.__cqDisposeOverlay`、`window.__cqDtRoot`、`window.__cqLastError/__cqDebugLog` 是跨窗口/跨页签通信与调试接口，disposeCqResources 的清理逻辑（含 fetch 恢复、残留 iframe/script 移除、防重入 data-cq-fetch 检查）在重构中一个都不能丢。
4. **重复挂载语义**：didMount 环境可能反复执行脚本，新 panel.js 必须保持"先 dispose 旧实例再挂载"的行为。
5. **mock/真机数据路径分离**：rand* 只在 mock 模式启用；解析函数（parseDeductionTable 等）两处共用，别把 mock 逻辑混进解析。
6. **index.html 中表格脚本位置**：原 doc.write 模板里 `<script>` 之后由 embed 注入 DT_BUNDLE；新 index.html 里用 `<script type="module" src="src/panel.js">` 做开发入口，build.mjs 构建时替换为内联 bundle 占位。

## 七、验收清单

- `npm run build` 一键产出 dist/index.js，粘贴 didMount 后六个页签加载、配置对话框、Excel 导出、组织树选择、真机 CRUD 行为与重构前一致
- 直接打开 overlay/index.html（mock 模式）可完整走通 UI 交互
- 除 host.js 外无 window.parent / document.getElementById 直调
- index.js 体积不劣化（gzip 后量级相当）
- 无 dist/data-tables.bundle.js、DT_BUNDLE、__cqDataTable 残留引用

## 八、执行顺序建议（你自己做时的节奏）

按 Step 1→8 顺序推进；Step 1-4 是纯搬运+收敛，风险低、建议一口气完成；Step 5-7 每个模块拆完立刻 build+预览验证；Step 8 最后统一清理。真机回归安排在 Step 2 末和 Step 8 末各一次。