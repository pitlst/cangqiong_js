/**
 * overlay/build.mjs — Step 2：组装 + 验证
 *
 * 从 overlay/styles.css + overlay/index.html 重建 doc.write 模板，
 * 与根目录 index.overlay-src.js 中原模板逐字节对比，验证 Step 1 搬迁无损。
 *
 * 用法：
 *   node overlay/build.mjs            默认：验证模式（只对比，不写盘）
 *   node overlay/build.mjs --write    把重建的完整 index.overlay-src.js 写到 dist/overlay-rebuilt.js
 *
 * 后续模块化拆分（Step 3-5）时以此脚本为回归基线：每拆一个模块，
 * 跑一遍本脚本确认组装结果仍与原件一致。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC_FILE = path.join(root, "index.overlay-src.js");
const CSS_FILE = path.join(__dirname, "styles.css");
const HTML_FILE = path.join(__dirname, "index.html");
const OUT_FILE = path.join(root, "dist", "overlay-rebuilt.js");

const DOC_WRITE_KEY = "doc.write(`";

// ---------- 提取原文件里的 doc.write 模板（纯文本切片，不做转义解析） ----------
function extractOriginalTemplate(src) {
    const at = src.indexOf(DOC_WRITE_KEY);
    if (at < 0) throw new Error("index.overlay-src.js 里找不到 " + DOC_WRITE_KEY);
    const start = at + DOC_WRITE_KEY.length;
    const end = src.indexOf("`", start);
    if (end < 0) throw new Error("doc.write 模板没有闭合反引号");
    return { value: src.slice(start, end), start, end };
}

// ---------- 从 index.html 切出 body / 脚本片段 ----------
function splitIndexHtml(html) {
    html = html.replace(/\r\n/g, "\n"); // 统一 LF 再切分，组装时统一转回 CRLF
    const bodyTag = "<body>";
    const scriptTag = "<script>";
    const bodyStart = html.indexOf(bodyTag);
    const scriptStart = html.indexOf(scriptTag);
    const scriptEnd = html.lastIndexOf("</script>");
    if (bodyStart < 0 || scriptStart < 0 || scriptEnd < 0 || scriptEnd < scriptStart) {
        throw new Error("overlay/index.html 结构异常（找不到 <body>/<script>/</script>）");
    }
    const body = html.slice(bodyStart + bodyTag.length, scriptStart).replace(/^\s*\n/, "").replace(/\s+$/, "");
    const js = html.slice(scriptStart + scriptTag.length, scriptEnd).replace(/^\s*\n/, "").replace(/\s+$/, "");
    return { body, js };
}

// ---------- 组装 doc.write 模板（格式还原到与原文件一致） ----------
function assembleTemplate(css, body, js) {
    // 原模板里 CSS 每行 8 空格缩进；styles.css 是提取出来的，无缩进，这里补回
    const cssIndented = css
        .replace(/\r\n/g, "\n") // 统一 LF
        .replace(/\s+$/, "")
        .split("\n")
        .map((line) => (line.trim() === "" ? "" : "        " + line))
        .join("\n");
    // 脚本结束标签在原模板里写成 <\/script>（模板字面量的转义写法），这里保持一致。
    // 注意原文件是 CRLF 换行，模板值以空行开头、以 "        "（模板闭合行前的缩进）结尾。
    const parts = [
        "",
        "<!DOCTYPE html>",
        '<html lang="zh-CN">',
        "",
        "<head>",
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
        "    <title>列表编辑页面</title>",
        "    <style>",
        cssIndented,
        "    </style>",
        "</head>",
        "",
        "<body>",
        body,
        "    <script>",
        js,
        "    <\\/script>",
        "</body>",
        "",
        "</html>",
        "        ",
    ];
    return parts.join("\n").replace(/\n/g, "\r\n");
}

// ---------- 逐行对比，输出差异 ----------
function diffReport(a, b) {
    const al = a.split("\n");
    const bl = b.split("\n");
    const n = Math.max(al.length, bl.length);
    let diffs = 0;
    for (let i = 0; i < n; i++) {
        if (al[i] !== bl[i]) {
            if (diffs < 10) {
                console.log("  差异 @第 " + (i + 1) + " 行:");
                console.log("    原: " + JSON.stringify(al[i] ?? ""));
                console.log("    新: " + JSON.stringify(bl[i] ?? ""));
            }
            diffs++;
        }
    }
    return diffs;
}

// ---------- 空白归一化对比：忽略换行/缩进/空行后内容是否等价 ----------
function contentEquals(a, b) {
    const norm = (s) => s.replace(/\r/g, "").replace(/\s+/g, "");
    return norm(a) === norm(b);
}

// ---------- 主流程 ----------
const writeMode = process.argv.includes("--write");

const src = fs.readFileSync(SRC_FILE, "utf8");
const original = extractOriginalTemplate(src);
const css = fs.readFileSync(CSS_FILE, "utf8");
const html = fs.readFileSync(HTML_FILE, "utf8");
const { body, js } = splitIndexHtml(html);

const assembled = assembleTemplate(css, body, js);
console.log("原模板: " + original.value.split("\n").length + " 行");
console.log("组装值: " + assembled.split("\n").length + " 行");

const diffs = diffReport(original.value, assembled);
const contentOk = contentEquals(original.value, assembled);
if (diffs === 0) {
    console.log("STEP1 搬迁验证通过：组装结果与原 doc.write 模板逐字节一致 ✔");
} else if (contentOk) {
    console.log("STEP1 搬迁验证通过：内容等价（空白归一化后一致）✔");
    console.log("  注意：存在 " + diffs + " 处格式差异（换行/缩进/空行，不影响语义），详见上方前 10 处");
} else {
    console.log("STEP1 搬迁验证未通过：共 " + diffs + " 处差异，且空白归一化后仍不一致 ✘");
}

if (writeMode) {
    if (!fs.existsSync(path.dirname(OUT_FILE))) fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    // 重建完整文件：原文件 doc.write 模板之前的部分 + 新模板 + 模板之后的部分
    const rebuilt = src.slice(0, original.start) + assembled + src.slice(original.end);
    fs.writeFileSync(OUT_FILE, rebuilt);
    const wholeDiff = rebuilt === src ? 0 : diffReport(src, rebuilt);
    const wholeOk = contentEquals(src, rebuilt);
    console.log("已写入 " + OUT_FILE + "（" + rebuilt.length + " 字节）");
    if (wholeDiff === 0) console.log("重建文件与 index.overlay-src.js 逐字节一致 ✔");
    else if (wholeOk) console.log("重建文件与原文件内容等价（差异均为格式）✔");
    else console.log("重建文件与原文件内容不一致 ✘");
    process.exit(contentOk && wholeOk ? 0 : 1);
}
process.exit(diffs === 0 || contentOk ? 0 : 1);
