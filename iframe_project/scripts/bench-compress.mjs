import { readFileSync } from 'node:fs'
import { brotliCompressSync, constants, deflateSync, gzipSync } from 'node:zlib'
import { gzipAsync } from '@gfx/zopfli'

const html = readFileSync('dist/index.html', 'utf8')
const raw = Buffer.from(html, 'utf8')

function b64len(buf) {
    return Buffer.from(buf).toString('base64').length
}

function packSize(b64Length, width) {
    const lines = Math.ceil(b64Length / width)
    return 7 + lines * 9 + b64Length
}

const zopfliGzip = await gzipAsync(raw, { numiterations: 15 })
const variants = [
    ['gzip-9', gzipSync(raw, { level: 9 })],
    ['zopfli-15', zopfliGzip],
    ['deflate-9', deflateSync(raw, { level: 9 })],
    [
        'brotli-6',
        brotliCompressSync(raw, {
            params: { [constants.BROTLI_PARAM_QUALITY]: 6 },
        }),
    ],
    [
        'brotli-9',
        brotliCompressSync(raw, {
            params: { [constants.BROTLI_PARAM_QUALITY]: 9 },
        }),
    ],
    [
        'brotli-11',
        brotliCompressSync(raw, {
            params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
        }),
    ],
]

console.log(`HTML bytes: ${raw.length}`)
for (const [name, buf] of variants) {
    const b64 = b64len(buf)
    console.log(
        `${name}: compressed ${buf.length} (${((buf.length / raw.length) * 100).toFixed(1)}%), b64 ${b64}, pack@56 ${packSize(b64, 56)}, pack@71 ${packSize(b64, 71)}`,
    )
}
