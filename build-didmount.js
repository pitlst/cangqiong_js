/**
 * Build Cosmic didMount index.js: overlay as a covering Shadow DOM, not an iframe.
 * Markup/CSS/table bundle are gzipped; panel logic stays as real JavaScript.
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const srcPath = path.join(__dirname, "index.overlay-src.js");
const bundlePath = path.join(__dirname, "dist", "data-tables.bundle.js");
const outPath = path.join(__dirname, "index.js");

function extractTemplate(src, backtickIndex) {
    if (src[backtickIndex] !== "`") {
        throw new Error("expected backtick at " + backtickIndex);
    }
    let i = backtickIndex + 1;
    let out = "";
    while (i < src.length) {
        const c = src[i];
        if (c === "`") return { value: out, end: i + 1 };
        if (c === "$" && src[i + 1] === "{") {
            throw new Error("unescaped interpolation at " + i);
        }
        if (c === "\\") {
            const n = src[i + 1];
            if (n == null) throw new Error("dangling escape at " + i);
            const simple = {
                n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", v: "\v",
                "0": "\0", "`": "`", "\\": "\\", $: "$", "'": "'", '"': '"',
            };
            if (Object.prototype.hasOwnProperty.call(simple, n)) {
                out += simple[n];
                i += 2;
                continue;
            }
            if (n === "u") {
                if (src[i + 2] === "{") {
                    const close = src.indexOf("}", i + 3);
                    out += String.fromCodePoint(parseInt(src.slice(i + 3, close), 16));
                    i = close + 1;
                    continue;
                }
                out += String.fromCharCode(parseInt(src.slice(i + 2, i + 6), 16));
                i += 6;
                continue;
            }
            if (n === "x") {
                out += String.fromCharCode(parseInt(src.slice(i + 2, i + 4), 16));
                i += 4;
                continue;
            }
            out += n;
            i += 2;
            continue;
        }
        out += c;
        i++;
    }
    throw new Error("unterminated template literal");
}

function splitSrcdoc(html) {
    const styleOpen = html.indexOf("<style>");
    const styleClose = html.indexOf("</style>");
    const scriptOpen = html.indexOf("<script>");
    const scriptClose = html.lastIndexOf("</script>");
    if (styleOpen < 0 || styleClose < 0 || scriptOpen < 0 || scriptClose < 0) {
        throw new Error("srcdoc missing style/script");
    }
    const css = html.slice(styleOpen + 7, styleClose);
    const bodyOpen = html.indexOf("<body>");
    const body = html.slice(bodyOpen >= 0 ? bodyOpen + 6 : styleClose + 8, scriptOpen).trim();
    const js = html.slice(scriptOpen + 8, scriptClose);
    return { css, html: body, js };
}

function transformCss(css) {
    let out = css.replace(/:root\s*\{/, ":host {\n            display: block;\n            width: 100%;\n            height: 100%;");
    out = out.replace(/\.dark\s*\{/, ":host(.dark) {");
    out = out.replace(/\.dark /g, ":host(.dark) ");
    return out;
}

function transformJs(js) {
    let out = js;
    out = out.replace(
        /window\.parent\.document\.getElementById\("shadcn-hello-inject-root"\)\.remove\(\)/g,
        "unmountHost()"
    );
    out = out.replace(/window\.parent\.console/g, "window.console");
    out = out.replace(
        /function hostWin\(\) \{\s*try \{ return window\.parent; \} catch \(e\) \{ return window; \}\s*\}/,
        "function hostWin() { return window; }"
    );
    out = out.replace(/hostWin\(\)\.document\.getElementById/g, "__HOST_GET_ID__");
    out = out.replace(/document\.getElementById\(/g, "uiEl(");
    out = out.replace(/__HOST_GET_ID__/g, "hostWin().document.getElementById");
    out = out.replace(/document\.querySelectorAll\(/g, "uiAll(");
    out = out.replace(/document\.documentElement\.classList/g, "host.classList");
    return out;
}

function packPayloads(css, html, bundle) {
    const parts = [css, html, bundle].map(function (s) { return Buffer.from(s, "utf8"); });
    let total = 12;
    parts.forEach(function (p) { total += p.length; });
    const buf = Buffer.alloc(total);
    let o = 0;
    parts.forEach(function (p) {
        buf.writeUInt32BE(p.length, o);
        o += 4;
        p.copy(buf, o);
        o += p.length;
    });
    return zlib.gzipSync(buf, { level: 9 });
}

function emitPack(b64, width) {
    const lines = ["    var PACK = \"\";"];
    for (let i = 0; i < b64.length; i += width) {
        lines.push("    PACK += \"" + b64.slice(i, i + width) + "\";");
    }
    return lines.join("\n");
}

function build() {
    if (!fs.existsSync(srcPath)) {
        console.error("missing index.overlay-src.js");
        process.exit(1);
    }
    if (!fs.existsSync(bundlePath)) {
        console.error("missing dist/data-tables.bundle.js, run npm run build:tables");
        process.exit(1);
    }
    const src = fs.readFileSync(srcPath, "utf8");
    const htmlKey = "doc.write(`";
    const htmlAt = src.indexOf(htmlKey);
    if (htmlAt < 0) {
        console.error("index.overlay-src.js is missing doc.write template");
        process.exit(1);
    }
    const srcdoc = extractTemplate(src, htmlAt + htmlKey.length - 1).value;
    const split = splitSrcdoc(srcdoc);
    const css = transformCss(split.css);
    const html = split.html;
    const overlayJs = transformJs(split.js);
    const bundle = fs.readFileSync(bundlePath, "utf8");

    try {
        new Function("host", "shadow", "uiEl", "uiAll", "unmountHost", overlayJs);
    } catch (e) {
        console.error("overlay js parse failed:", e.message);
        process.exit(1);
    }

    const gz = packPayloads(css, html, bundle);
    const b64 = gz.toString("base64");

    const out = [
        "// @ts-nocheck",
        "/* Paste entire file into Cosmic page JS didMount. */",
        "(function () {",
        "    try {",
        "        if (window.frameElement && window.frameElement.getAttribute(\"data-cq-fetch\") === \"1\") return;",
        "    } catch (eSkip) { }",
        "    function utf8FromBytes(bytes) {",
        "        var out = \"\";",
        "        var i = 0;",
        "        while (i < bytes.length) {",
        "            var c = bytes[i++];",
        "            if (c < 128) {",
        "                out += String.fromCharCode(c);",
        "            } else if (c < 224) {",
        "                var c2 = bytes[i++];",
        "                out += String.fromCharCode(((c & 31) << 6) | (c2 & 63));",
        "            } else if (c < 240) {",
        "                var c2 = bytes[i++];",
        "                var c3 = bytes[i++];",
        "                out += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));",
        "            } else {",
        "                var c2 = bytes[i++];",
        "                var c3 = bytes[i++];",
        "                var c4 = bytes[i++];",
        "                var u = ((c & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);",
        "                u -= 65536;",
        "                out += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023));",
        "            }",
        "        }",
        "        return out;",
        "    }",
        "    function dec(bytes) {",
        "        if (typeof TextDecoder !== \"undefined\") return new TextDecoder(\"utf-8\").decode(bytes);",
        "        return utf8FromBytes(bytes);",
        "    }",
        "    function b64ToU8(b64) {",
        "        var bin = atob(b64);",
        "        var bytes = new Uint8Array(bin.length);",
        "        var i;",
        "        for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);",
        "        return bytes;",
        "    }",
        "    function u32(bytes, off) {",
        "        return ((bytes[off] << 24) | (bytes[off + 1] << 16) | (bytes[off + 2] << 8) | bytes[off + 3]) >>> 0;",
        "    }",
        "    function unpack(bytes) {",
        "        var o = 0;",
        "        function next() {",
        "            var n = u32(bytes, o);",
        "            o += 4;",
        "            var s = dec(bytes.subarray(o, o + n));",
        "            o += n;",
        "            return s;",
        "        }",
        "        return { css: next(), html: next(), bundle: next() };",
        "    }",
        "    function inflateGzip(bytes, done) {",
        "        if (typeof DecompressionStream === \"undefined\") {",
        "            try { console.error(\"[cq-demo] DecompressionStream unavailable\"); } catch (e0) { }",
        "            return;",
        "        }",
        "        var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(\"gzip\"));",
        "        new Response(stream).arrayBuffer().then(function (buf) {",
        "            done(new Uint8Array(buf));",
        "        }).catch(function (err) {",
        "            try { console.error(\"[cq-demo] inflate failed\", err); } catch (e1) { }",
        "        });",
        "    }",
        emitPack(b64, 56),
        "    var ROOT_ID = \"shadcn-hello-inject-root\";",
        "    function mountOverlay(css, html, bundle) {",
        "        try {",
        "            if (typeof window.__cqDisposeOverlay === \"function\") window.__cqDisposeOverlay();",
        "        } catch (eDisp0) { }",
        "        try {",
        "            var leftoverFrames = document.querySelectorAll(\"iframe[data-cq-fetch='1'],#cq-fetch-frame\");",
        "            var fi;",
        "            for (fi = 0; fi < leftoverFrames.length; fi++) {",
        "                try { leftoverFrames[fi].src = \"about:blank\"; } catch (eF1) { }",
        "                if (leftoverFrames[fi].parentNode) leftoverFrames[fi].parentNode.removeChild(leftoverFrames[fi]);",
        "            }",
        "        } catch (eDisp1) { }",
        "        try {",
        "            var leftoverScripts = document.querySelectorAll(\"script[data-cq-dt-bundle='1']\");",
        "            var si;",
        "            for (si = 0; si < leftoverScripts.length; si++) {",
        "                if (leftoverScripts[si].parentNode) leftoverScripts[si].parentNode.removeChild(leftoverScripts[si]);",
        "            }",
        "        } catch (eDisp2) { }",
        "        var oldRoot = document.getElementById(ROOT_ID);",
        "        if (oldRoot && oldRoot.parentNode) oldRoot.parentNode.removeChild(oldRoot);",
        "        var host = document.createElement(\"div\");",
        "        host.id = ROOT_ID;",
        "        host.setAttribute(\"style\", \"position:fixed;inset:0;z-index:2147483647;display:block;background:#fff;\");",
        "        var shadow = host.attachShadow({ mode: \"open\" });",
        "        window.__cqDtRoot = shadow;",
        "        var styleEl = document.createElement(\"style\");",
        "        styleEl.textContent = css;",
        "        shadow.appendChild(styleEl);",
        "        var wrap = document.createElement(\"div\");",
        "        wrap.style.cssText = \"height:100%;font:inherit;color:inherit;\";",
        "        wrap.innerHTML = html;",
        "        shadow.appendChild(wrap);",
        "        (document.documentElement || document.body).appendChild(host);",
        "        function uiEl(id) { return shadow.getElementById(id); }",
        "        function uiAll(sel) { return shadow.querySelectorAll(sel); }",
        "        function unmountHost() {",
        "            window.__cqDtRoot = null;",
        "            if (host && host.parentNode) host.parentNode.removeChild(host);",
        "        }",
        overlayJs,
        "        var se = document.createElement(\"script\");",
        "        se.setAttribute(\"data-cq-dt-bundle\", \"1\");",
        "        se.textContent = bundle;",
        "        (document.body || document.documentElement).appendChild(se);",
        "    }",
        "    function inject() {",
        "        var root = document.documentElement || document.body;",
        "        if (!root) {",
        "            setTimeout(inject, 50);",
        "            return;",
        "        }",
        "        try {",
        "            inflateGzip(b64ToU8(PACK), function (raw) {",
        "                try {",
        "                    var pack = unpack(raw);",
        "                    mountOverlay(pack.css, pack.html, pack.bundle);",
        "                } catch (err2) {",
        "                    try { console.error(\"[cq-demo] unpack failed\", err2); } catch (e2) { }",
        "                }",
        "            });",
        "        } catch (err) {",
        "            try { console.error(\"[cq-demo] inject failed\", err); } catch (e3) { }",
        "        }",
        "    }",
        "    inject();",
        "})();",
        "",
    ].join("\n");

    fs.writeFileSync(outPath, out);
    console.log(
        "wrote", outPath,
        "bytes", out.length,
        "gzip", gz.length,
        "lines", out.split(/\n/).length,
        "overlayJs", overlayJs.length
    );
}

if (require.main === module) build();
module.exports = build;
