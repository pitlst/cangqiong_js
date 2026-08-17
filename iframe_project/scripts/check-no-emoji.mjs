import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()

const SKIP_DIRS = new Set(['node_modules', 'dist', 'dist-ssr', '.git', '.vscode'])
const SKIP_FILES = new Set(['pnpm-lock.yaml', 'package-lock.json'])
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.html', '.json', '.md', '.svg'])

/** MySQL utf8/utf8mb3 无法存储的 4 字节字符（如 U+1F4BF） */
const NON_BMP = /[\u{10000}-\u{10FFFF}]/gu
/** 表情符号（含部分 BMP 内符号） */
const EMOJI = /\p{Extended_Pictographic}/gu

async function walk(dir, files = []) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            if (!SKIP_DIRS.has(entry.name)) {
                await walk(fullPath, files)
            }
            continue
        }
        if (!entry.isFile() || SKIP_FILES.has(entry.name)) {
            continue
        }
        if (EXTENSIONS.has(path.extname(entry.name))) {
            files.push(fullPath)
        }
    }
    return files
}

function toLoc(text, index) {
    const until = text.slice(0, index)
    const lines = until.split(/\r\n|\n|\r/)
    return {
        line: lines.length,
        column: lines.at(-1).length + 1,
    }
}

function codePointLabel(value) {
    const codePoint = value.codePointAt(0)
    return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`
}

function findForbidden(text) {
    const hits = []
    const seen = new Set()
    for (const regex of [NON_BMP, EMOJI]) {
        regex.lastIndex = 0
        let match = regex.exec(text)
        while (match) {
            if (!seen.has(match.index)) {
                seen.add(match.index)
                hits.push({ index: match.index, value: match[0] })
            }
            match = regex.exec(text)
        }
    }
    hits.sort((a, b) => a.index - b.index)
    return hits
}

const files = await walk(ROOT)
const errors = []

for (const file of files) {
    const text = await readFile(file, 'utf8')
    const relative = path.relative(ROOT, file).replaceAll('\\', '/')
    for (const hit of findForbidden(text)) {
        const { line, column } = toLoc(text, hit.index)
        errors.push(`${relative}:${line}:${column}  不允许使用 emoji / 4 字节字符 “${hit.value}” (${codePointLabel(hit.value)})，苍穹 utf8 字段无法保存`)
    }
}

if (errors.length > 0) {
    console.error(`发现 ${errors.length} 处禁止的 emoji / 4 字节字符：\n`)
    for (const error of errors) {
        console.error(error)
    }
    process.exitCode = 1
}
