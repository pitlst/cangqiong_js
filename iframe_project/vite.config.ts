import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** 苍穹 MySQL utf8/utf8mb3 存不下 4 字节字符；写成 JS `\ud83d\udcbf`，入库是 ASCII，运行时还原 */
const NON_BMP = /[\u{10000}-\u{10FFFF}]/gu
const PACK_WIDTH = 56

function toJsUnicodeEscape(ch: string): string {
    const codePoint = ch.codePointAt(0)
    if (codePoint === undefined || codePoint <= 0xffff) {
        return ch
    }
    const shifted = codePoint - 0x10000
    const high = 0xd800 + (shifted >> 10)
    const low = 0xdc00 + (shifted & 0x3ff)
    return `\\u${high.toString(16).padStart(4, '0')}\\u${low.toString(16).padStart(4, '0')}`
}

function escapeNonBmpChars(text: string): string {
    return text.replace(NON_BMP, toJsUnicodeEscape)
}

function flattenNewlines(text: string): string {
    return text.replace(/\r\n|\r|\n/g, '')
}

function emitPack(b64: string, width: number): string {
    const lines = ['var PACK="";']
    for (let i = 0; i < b64.length; i += width) {
        lines.push(`PACK+="${b64.slice(i, i + width)}";`)
    }
    return lines.join('\n')
}

function toCangqiongPlugin(html: string): string {
    const b64 = gzipSync(Buffer.from(html, 'utf8'), { level: 9 }).toString('base64')
    if (/[^A-Za-z0-9+/=]/.test(b64)) {
        throw new Error('base64 含非法字符，无法放入苍穹双引号字符串')
    }
    return [
        '(function () {',
        emitPack(b64, PACK_WIDTH),
        '    function utf8FromBytes(bytes) {',
        '        var out = "";',
        '        var i = 0;',
        '        while (i < bytes.length) {',
        '            var c = bytes[i++];',
        '            if (c < 128) {',
        '                out += String.fromCharCode(c);',
        '            } else if (c < 224) {',
        '                var c2 = bytes[i++];',
        '                out += String.fromCharCode(((c & 31) << 6) | (c2 & 63));',
        '            } else if (c < 240) {',
        '                var c2 = bytes[i++];',
        '                var c3 = bytes[i++];',
        '                out += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));',
        '            } else {',
        '                var c2 = bytes[i++];',
        '                var c3 = bytes[i++];',
        '                var c4 = bytes[i++];',
        '                var u = ((c & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);',
        '                u -= 65536;',
        '                out += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023));',
        '            }',
        '        }',
        '        return out;',
        '    }',
        '    function dec(bytes) {',
        '        if (typeof TextDecoder !== "undefined") return new TextDecoder("utf-8").decode(bytes);',
        '        return utf8FromBytes(bytes);',
        '    }',
        '    function b64ToU8(b64) {',
        '        var bin = atob(b64);',
        '        var bytes = new Uint8Array(bin.length);',
        '        var i;',
        '        for (i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);',
        '        return bytes;',
        '    }',
        '    function inflateGzip(bytes, done) {',
        '        if (typeof DecompressionStream === "undefined") {',
        '            try { console.error("[iframe_project] DecompressionStream unavailable"); } catch (e0) {}',
        '            return;',
        '        }',
        '        var stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));',
        '        new Response(stream).arrayBuffer().then(function (buf) {',
        '            done(new Uint8Array(buf));',
        '        }).catch(function (err) {',
        '            try { console.error("[iframe_project] inflate failed", err); } catch (e1) {}',
        '        });',
        '    }',
        '    function mount(html) {',
        '        var n = "__iframe_project_root__";',
        '        var o = document.getElementById(n);',
        '        if (o && o.parentNode) o.parentNode.removeChild(o);',
        '        var f = document.createElement("iframe");',
        '        f.id = n;',
        '        f.style.cssText = "position:fixed;inset:0;width:100%;height:100%;";',
        '        f.style.cssText += "border:0;margin:0;padding:0;z-index:2147483647;background:#fff";',
        '        f.srcdoc = html;',
        '        (document.documentElement || document.body).appendChild(f);',
        '    }',
        '    function inject() {',
        '        var root = document.documentElement || document.body;',
        '        if (!root) {',
        '            setTimeout(inject, 50);',
        '            return;',
        '        }',
        '        inflateGzip(b64ToU8(PACK), function (raw) {',
        '            mount(dec(raw));',
        '        });',
        '    }',
        '    inject();',
        '})();',
        '',
    ].join('\n')
}

function cangqiongSafeOutputPlugin(): Plugin {
    return {
        name: 'cangqiong-safe-output',
        apply: 'build',
        enforce: 'post',
        generateBundle(_options, bundle) {
            for (const item of Object.values(bundle)) {
                if (item.type === 'chunk') {
                    item.code = flattenNewlines(escapeNonBmpChars(item.code))
                    continue
                }
                if (item.type === 'asset') {
                    const source = typeof item.source === 'string' ? item.source : new TextDecoder().decode(item.source)
                    item.source = flattenNewlines(escapeNonBmpChars(source))
                }
            }
        },
        closeBundle() {
            const htmlFile = path.resolve(__dirname, 'dist/index.html')
            const jsFile = path.resolve(__dirname, 'dist/index.js')
            if (!existsSync(htmlFile)) {
                return
            }
            const html = flattenNewlines(escapeNonBmpChars(readFileSync(htmlFile, 'utf8')))
            if (/[\u{10000}-\u{10FFFF}]/u.test(html)) {
                throw new Error('dist/index.html 仍含 4 字节 UTF-8 字符，无法写入苍穹 utf8 字段')
            }
            writeFileSync(htmlFile, html)
            const plugin = toCangqiongPlugin(html)
            if (plugin.includes('`') || plugin.includes('=>')) {
                throw new Error('苍穹插件含模板字符串或箭头函数，Babel toEs5 会拆坏')
            }
            const quoted = plugin.match(/"[^"\\]*(?:\\.[^"\\]*)*"/g) || []
            for (const str of quoted) {
                if (/[\r\n]/.test(str)) {
                    throw new Error('苍穹插件字符串字面量含真实换行')
                }
                if (str.length > 80) {
                    throw new Error(`苍穹插件字符串过长 (${str.length})，编辑器折行会拆开双引号`)
                }
            }
            try {
                new Function(plugin)
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error)
                throw new Error(`苍穹插件 JS 语法无效: ${message}`)
            }
            writeFileSync(jsFile, plugin)
        },
    }
}

export default defineConfig({
    plugins: [react(), tailwindcss(), viteSingleFile(), cangqiongSafeOutputPlugin()],
    publicDir: false,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        target: 'es2015',
        cssCodeSplit: false,
        assetsInlineLimit: 10485760,
        minify: true,
    },
})
