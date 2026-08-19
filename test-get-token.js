/**
 * 苍穹 OpenAPI 基本认证测试（openApiSign）
 * 用法: node test-get-token.js
 */

const GATEWAY = 'https://cangqiongtestzelc.crrcgc.cc:6888/ierp'
const OPEN_API_SIGN = 'TzBPaFZudWc2YzZkbjJvRXBXblF2d18ySlNGYndLV2VOWFpiMG1FR2laTT06OTU2NTk5ODQ0NjQ5MDQyOTQ0'
const DEDUCTION_API = `${GATEWAY}/kapi/v2/crrc/crrc_dj/crrc_deduction_log/point_deduction_ledger`

function buildUrl(path, query = {}) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
        if (value != null && value !== '') params.set(key, String(value))
    }
    params.set('openApiSign', OPEN_API_SIGN)
    return `${path}?${params.toString()}`
}

async function testApi() {
    const url = buildUrl(DEDUCTION_API, { pageSize: 10, pageNo: 1 })
    const body = { data: {}, pageSize: 10, pageNo: 1 }

    console.log('POST', url)
    console.log('Body:', JSON.stringify(body))

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    const text = await res.text()
    console.log('HTTP', res.status)
    try {
        const json = JSON.parse(text)
        console.log(JSON.stringify(json, null, 2))
        if (json.status) {
            console.log('\n基本认证成功，返回行数:', json.data?.rows?.length ?? 0)
        } else {
            console.log('\n调用失败:', json.message || json.errorCode || text)
        }
    } catch {
        console.log(text)
    }
}

testApi().catch((err) => {
    console.error('请求异常:', err.message || err)
    process.exit(1)
})
