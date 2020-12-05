const md5 = require('md5')
const dateFormat = require('dateformat')
const router = require('koa-router')()
const axios = require('axios')
const { token, method, signtype, shopid, signKey, charset } = require('../../../../config/default').pncard_config

/**
 * 查询品诺卡余额
 */
router.post('/', async (ctx, next) => {
        // 品诺卡二维码
        let { paycode } = ctx.request.body
        // 时间戳
        let timestamp = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
        // 查询的内容JSON
        let content = JSON.stringify({ shopid, paycode, timestamp })
        // 查询内容签名
        let sign = md5(content + signKey)

        let result = await axios.post('http://www.crowncake.cn:18900/ipay/v2/Getway', {
                token,
                method,
                signtype,
                sign,
                charset,
                content
        })

        let res = JSON.parse(result.data)

        console.log(res)

        if (res.code !== 0) {
                ctx.sendResult(null, 400, '查询失败')
                return
        }

        ctx.sendResult(res, 200, '查询成功')

        next()
})


module.exports = router.routes()