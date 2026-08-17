/**
 * 苍穹 OpenAPI：扣分项台账 point_deduction_ledger
 * 用法: node test-deduction-openapi.js
 */

const GATEWAY = 'https://cangqiongtestzelc.crrcgc.cc:6888/ierp'
const CLIENT_ID = 'shengchanfuzhuxitong'
const CLIENT_SECRET = 'Sunwenqi8855830.'
const USERNAME = '010200003204'
const ACCOUNT_ID = '956599844649042944'

const DEDUCTION_API = `${GATEWAY}/kapi/v2/crrc/crrc_dj/crrc_deduction_log/point_deduction_ledger`

function pad(n) {
    return String(n).padStart(2, '0')
}

function formatTimestamp(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function randomNonce() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
    return `n${Date.now()}-${Math.random().toString(16).slice(2)}`
}

async function getToken() {
    const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: USERNAME,
        accountId: ACCOUNT_ID,
        language: 'zh_CN',
        nonce: randomNonce(),
        timestamp: formatTimestamp(new Date()),
    }

    const res = await fetch(`${GATEWAY}/kapi/oauth2/getToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    const json = await res.json()
    if (!json.status || !json.data?.access_token) {
        throw new Error(json.message || json.errorcode || JSON.stringify(json))
    }
    return json.data.access_token
}

async function fetchDeductionLedger(accessToken, pageNo = 1, pageSize = 10) {
    const body = {
        data: {},
        pageSize,
        pageNo,
    }

    console.log('POST', DEDUCTION_API)
    console.log('Body:', JSON.stringify(body))

    const res = await fetch(DEDUCTION_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            access_token: accessToken,
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
    console.log('1. 获取 access_token …')
    const token = await getToken()
    console.log('   token 已获取\n')

    console.log('2. 查询扣分项台账 …')
    await fetchDeductionLedger(token, 1, 10)
}

main().catch((err) => {
    console.error('请求异常:', err.message || err)
    process.exit(1)
})
