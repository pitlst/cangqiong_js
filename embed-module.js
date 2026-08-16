const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "dist", "data-tables.bundle.js");
const indexPath = path.join(__dirname, "index.js");

if (!fs.existsSync(bundlePath)) {
    console.error("未找到 dist/data-tables.bundle.js，请先运行: npm run build:tables");
    process.exit(1);
}

const bundle = fs.readFileSync(bundlePath, "utf8");
const esc = bundle.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

let idx = fs.readFileSync(indexPath, "utf8");

function removeBlock(src, marker) {
    const start = src.indexOf("    const " + marker + " = `");
    const rootId = src.indexOf("    const ROOT_ID = ");
    if (start >= 0 && rootId > start) return src.slice(0, start) + src.slice(rootId);
    return src;
}

idx = removeBlock(idx, "DT_MODULE");
idx = removeBlock(idx, "DT_BUNDLE");

if (!idx.includes("const DT_BUNDLE")) {
    idx = idx.replace("(() => {", "(() => {\n    const DT_BUNDLE = `" + esc + "`;");
}

if (!idx.includes("modEl.textContent = DT_BUNDLE")) {
    idx = idx.replace(
        "    doc.close();\n})();",
        '    doc.close();\n    const modEl = doc.createElement("script");\n    modEl.textContent = DT_BUNDLE;\n    doc.body.appendChild(modEl);\n})();'
    );
}

idx = idx.replace(/modEl\.type = "module";\s*/g, "");
idx = idx.replace(/modEl\.textContent = DT_MODULE;/g, "modEl.textContent = DT_BUNDLE;");

fs.writeFileSync(indexPath, idx);
console.log("embedded bundle into index.js, bytes:", esc.length);
