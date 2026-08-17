# 金蝶云苍穹 OpenAPI 接入指南（零代码操作API / 脚本API）

> 适用：苍穹 V6.0.1 及以上（新版 kapi 网关 + 增强型 Token）。
> 旧版 1.0 开放接口（`getAppToken.do` / `login.do` / `api/bos/v1.0` 标准接口）已关闭的环境，全部走本文描述的新版方式。

## 结论先说

- **零代码操作 API**（推荐）：在苍穹界面配置"操作 API"，绑定一个单据 + 一个操作（保存/查询/删除/提交/审核…），**不用写任何代码**，界面里有"在线调试"可以直接测。
- **脚本 API**（低代码）：`【OpenAPI】→【RESTful API】`，脚本里用预置变量 `$body_params / $query_params / $path_params`，适合复杂逻辑；官方完整示例需登录金蝶社区查看（见文末链接）。
- 两种方式最终调用方式完全一样：**先拿 access_token（增强型 Token，2 小时有效），再带在请求头里调接口**。

---

## 1. 一次性准备：第三方应用（必须）

所有 OpenAPI 调用都以"第三方应用"身份进行，只配一次。

1. 进入开放平台：
   - 苍穹 6.x：`【开发服务云】→【开放平台】→【第三方应用】`
   - 苍穹 7.x/8.x：`【开放服务云】→【OpenAPI】→【第三方应用】`（菜单名以你环境实际为准）
2. 新增第三方应用，录入：
   - **系统编码**（= client_id，调用时用）
   - 名称、说明等
3. 认证方式选择 **AccessToken 认证**，设置**认证密钥**（= client_secret，调用时用）
4. 在 accessToken 认证策略中**勾选"增强型 Token 认证"**（苍穹 6.0.1+ 才有；不开启则 `/kapi/oauth2/getToken` 会失败）
5. 绑定**代理用户**：选择有单据权限的账号
   - 简单做法：代理用户用管理员账号（或给自己开发用的高权限账号）
   - 严谨做法：普通账号，在`【系统服务云】→【权限管理】`中授予你要操作单据的**新增/修改/删除/查询**权限
6. 保存。记录四样东西：`client_id`、`client_secret`、代理用户账号、`accountId`

> `accountId`（数据中心ID）在哪看：开放平台页面（第三方应用列表/API管理页）通常直接显示；或在浏览器地址栏 URL 中找；或`【系统服务云】→【数据中心】`管理列表里看。

---

## 2. 路线A：零代码操作 API（推荐）

### 2.1 配置步骤（以你的 `crrc_dj_config_new` 单据为例）

1. 进入 `【开放服务云】→【OpenAPI】→【API管理】→【API开发】`（6.x 为 `【开发服务云】→【开放平台】`），点**新增**，类型选**操作 API**（零代码配置）。
2. 维护基本信息：
   - API 编码（英文语义化，如 `cqConfigSave`）、名称
   - 请求方式：POST
   - 所属应用：选你的应用（如 `crrc_dj`）
3. 选择**业务对象**：`crrc_dj_config_new`（你要操作哪张单据就选哪张，任意单据都行）
4. 选择**操作方式**：
   - 新增/更新 → **保存**（带 id 就是更新，或配候选键自动判断，见下）
   - 批量 → **批量保存**
   - 查列表 → **查询**
   - 按主键取详情 → **加载**
   - 删除 → **删除**
   - 提交/审核/反审核/撤销 → 对应操作方式
5. 定义**请求体**（要传哪些字段就添加哪些属性，例如）：
   - `billno`、`crrc_textfield`、`crrc_largetextfield`；如有分录再加分录行字段
6. （可选，强烈建议）设**候选键**：把"单据编号 billno"设为候选键 → 调用时"同编号存在则更新、不存在则新增"，这样**一个保存 API 同时实现了增和改**。
7. 保存后点**发布**（API 状态改为"发布"），界面会显示**访问地址**，复制它（形如 `https://你的网关/kapi/v2/{isv}/{应用}/{对象标识}/save`）。
8. **授权**：在 API 管理里把该 API 授权给第 1 步创建的第三方应用（或第三方应用详情里做应用授权）。

> 一个"操作 API"绑定一个单据。不同单据（`crrc_dj_config_new`、`crrc_dj_cb_count`、销售订单…）各发布一套保存/查询/删除即可，都是点鼠标的事。

### 2.2 更新（改）怎么实现

- 请求体带**主键 id** → 保存即更新；不带 id → 新增。
- 或配置候选键（推荐）：传 `billno`，苍穹自动"有则改、无则增"。

---

## 3. 调用方式（认证 + 增删改查）

### 3.1 获取 access_token（增强型 Token）

```bash
curl -X POST 'https://你的网关/kapi/oauth2/getToken' \
  -H 'Content-Type: application/json' \
  -d '{
    "client_id": "你的系统编码",
    "client_secret": "你的认证密钥",
    "username": "代理用户账号",
    "accountId": "数据中心ID",
    "language": "zh_CN",
    "nonce": "随便一个随机串",
    "timestamp": "2026-08-17 10:00:00"
  }'
```

返回（`status=true` 即成功）：

```json
{ "status": true, "data": { "access_token": "OPENAPIAUTH_xxx", "expires_in": "7200", ... } }
```

- 仓库里我放了一个现成脚本：`./get_token.sh <网关> <client_id> <client_secret> <代理用户> <accountId>`
- token **2 小时有效**，过期重新获取即可；调用端应缓存并在失效前刷新。

### 3.2 通用调用模板

```bash
curl -X POST 'https://你的网关/kapi/v2/{isv}/{应用}/{对象标识}/{操作}' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'access_token: OPENAPIAUTH_xxx' \
  -d '{请求体}'
```

> 地址以你在"API 开发"页面发布后复制的为准（`{isv}/{应用}` 每环境不同，不要手拼）。
> 响应统一为：`{ "status": true/false, "data": {...}, "message": "..." }`，`status=false` 时看 `message`。

### 3.3 增删改查示例（假设已发布 crrc_dj_config_new 的 save/query/load/delete 四个 API）

**新增**（请求体 = 你配置的字段）：

```bash
curl -X POST 'https://你的网关/kapi/v2/.../crrc_dj_config_new/save' \
  -H 'Content-Type: application/json' -H 'access_token: OPENAPIAUTH_xxx' \
  -d '{
    "billno": "CQ-TEST-001",
    "crrc_textfield": "1",
    "crrc_largetextfield": "{\"key\":\"value\"}"
  }'
```

**更新**（带主键 id；或依赖候选键 billno 自动更新）：

```bash
curl -X POST 'https://你的网关/kapi/v2/.../crrc_dj_config_new/save' \
  -H 'Content-Type: application/json' -H 'access_token: OPENAPIAUTH_xxx' \
  -d '{
    "id": "1234567890",
    "crrc_largetextfield": "改后的内容"
  }'
```

**查询**（请求体按你配置的查询参数，如过滤字段 + 分页）：

```bash
curl -X POST 'https://你的网关/kapi/v2/.../crrc_dj_config_new/query' \
  -H 'Content-Type: application/json' -H 'access_token: OPENAPIAUTH_xxx' \
  -d '{ "billno": "CQ-TEST-001" }'
```

**删除**（请求体传 id 或编号，按你配置的参数）：

```bash
curl -X POST 'https://你的网关/kapi/v2/.../crrc_dj_config_new/delete' \
  -H 'Content-Type: application/json' -H 'access_token: OPENAPIAUTH_xxx' \
  -d '{ "id": "1234567890" }'
```

**提交 / 审核**（单据状态流转，同上模板换操作名 submit / audit）。

> 配置完记得先用 API 开发页面的**在线调试**功能测一遍，它会把请求体/响应展示得明明白白，比你对着文档猜字段强。

### 3.4 注意事项

- 删除有状态限制：**已审核**单据要先"反审核"（unaudit）、**已提交未审核**要先"撤销"（unsubmit）才能删/改——把对应操作 API 也发布了即可。
- 批量保存：操作方式选"批量保存"，请求体传数组 `[{...}, {...}]`。
- 你在界面上配置的"操作参数"（如 importType、forcedSubmit）会出现在请求体可选参数里，按需勾选。

---

## 4. 路线B：脚本 API（低代码，适合复杂逻辑 / 通用任意单据）

不绑定具体单据、出入参完全自定义，路径：`【开放服务云】→【OpenAPI】→【RESTful API】→【RESTful API管理】` → 新增**自定义脚本 API**：

1. 维护基本信息（编码、名称、所属应用、服务类型）
2. 配置请求端点（方法 GET/POST、资源路径、完整请求地址）
3. 自定义请求参数（Path 参数 / Query 参数 / 请求体 / 请求头）
4. 编写脚本，脚本上下文**预置变量**：
   - `$path_params`（路径参数）
   - `$query_params`（查询参数）
   - `$body_params`（请求体）
   - 可调用 `invokeMicroService2(cloudid, appid, servicename, method, params, proxyuser)` 调微服务
5. 维护响应参数 → 保存 → 发布 → 用同一套 access_token 调用

> 官方完整示例（保存供应商、候选键、在线调试）在文档《苍穹OpenAPI V2.0接口脚本编写方法》里，需要登录金蝶社区查看（链接见文末）。如果你环境里已有要复用的微服务/Java 插件方法，脚本 API 里直接调即可；否则**零代码操作 API 通常已经够用**，脚本 API 留给复杂逻辑。

---

## 5. 常见问题

| 现象 | 原因/解决 |
|---|---|
| getToken 报错 / 401 | 第三方应用没勾"增强型 Token 认证"；client_secret 或 accountId 填错；token 过期（2 小时） |
| 调用报 403 / 无权限 | 代理用户没单据权限（去权限管理授权）；API 没授权给该第三方应用 |
| 访问地址 404 | 地址里的 `{isv}/{应用}` 段是环境生成的，务必从 API 开发页面复制，别手拼 |
| 保存/删除失败带状态报错 | 单据状态不允许：先 unsubmit / unaudit 再操作 |
| 找不到菜单 | 6.x 叫"开放平台"，7.x+ 叫"OpenAPI"，路径以你环境为准 |
| 批量 | 操作方式选"批量保存"，body 传数组 |

---

## 6. 参考资料（部分需登录金蝶账号）

- 苍穹 OpenAPI 开发规范：https://developer.kingdee.com/knowledge/367256698861227008
- OpenAPI 调用流程：https://vip.kingdee.com/knowledge/213309216805890816
- 增强型 Token 认证：https://vip.kingdee.com/knowledge/489812471545485056
- 脚本开发 RESTful API：https://vip.kingdee.com/knowledge/754667702886790144
- OpenAPI V2.0 接口脚本编写方法（供应商保存/候选键示例）：https://developer.kingdee.com/knowledge/466198039443462656
- 保存操作 API / 接口规范专题：https://vip.kingdee.com/knowledge/specialDetail/226337046514476288
- 金蝶官方 OpenAPI 调用 Demo（Java，含增强型 Token 示例）：https://gitee.com/MagicFactory/OpenapiDemo
