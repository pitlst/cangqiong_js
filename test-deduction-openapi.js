/**
 * 苍穹 OpenAPI：扣分项台账 point_deduction_ledger
 * 用法: node test-deduction-openapi.js
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

async function fetchDeductionLedger(pageNo = 1, pageSize = 10) {
    const body = {
        data: {},
        pageSize,
        pageNo,
    }
    const url = buildUrl(DEDUCTION_API, { pageSize, pageNo })

    console.log('POST', url)
    console.log('Body:', JSON.stringify(body))

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    })

    const text = await res.text()
    console.log('HTTP', res.status)
    try {
        const json = JSON.parse(text)
        console.log(JSON.stringify(json, null, 2))
        if (json.status && json.data) {
            const rows = json.data.rows || json.data.data || json.data.list || json.data
            const count = Array.isArray(rows) ? rows.length : typeof rows === 'object' && rows ? Object.keys(rows).length : 0
            console.log('\n成功，本页约', count, '条（具体结构见 data 字段）')
        } else {
            console.log('\n查询失败:', json.message || json.errorcode || text.slice(0, 500))
        }
        return json
    } catch {
        console.log(text.slice(0, 2000))
        return null
    }
}

async function main() {
    console.log('查询扣分项台账（基本认证 openApiSign）…')
    await fetchDeductionLedger(1, 10)
}

main().catch((err) => {
    console.error('请求异常:', err.message || err)
    process.exit(1)
})
