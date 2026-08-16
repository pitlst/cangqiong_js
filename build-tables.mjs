import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "dist");
const outfile = path.join(outDir, "data-tables.bundle.js");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

await esbuild.build({
    entryPoints: [path.join(__dirname, "data-tables-module.js")],
    bundle: true,
    format: "iife",
    platform: "browser",
    target: ["es2018"],
    outfile,
    minify: true,
    legalComments: "none",
    define: {
        "process.env.NODE_ENV": '"production"',
    },
});

const size = fs.statSync(outfile).size;
console.log("built", outfile, "(" + size + " bytes)");
