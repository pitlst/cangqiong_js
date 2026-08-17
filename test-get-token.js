/**
 * 苍穹 OpenAPI 增强型 Token 测试
 * 用法: node test-get-token.js
 */

const GATEWAY = 'https://cangqiongtestzelc.crrcgc.cc:6888/ierp'
const CLIENT_ID = 'shengchanfuzhuxitong'
const CLIENT_SECRET = 'Sunwenqi8855830.'
const USERNAME = '010200003204'
const ACCOUNT_ID = '956599844649042944'

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

    const url = `${GATEWAY}/kapi/oauth2/getToken`
    console.log('POST', url)
    console.log('Body:', JSON.stringify({ ...body, client_secret: '***' }))

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
        if (json.status && json.data?.access_token) {
            console.log('\n成功 access_token:', json.data.access_token)
            console.log('有效期(秒):', json.data.expires_in)
        } else {
            console.log('\n获取失败:', json.message || json.error || text)
        }
        return json
    } catch {
        console.log(text)
        return null
    }
}

getToken().catch((err) => {
    console.error('请求异常:', err.message || err)
    process.exit(1)
})
