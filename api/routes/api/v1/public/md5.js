const md5 = require('md5')
const dateFormat = require('dateformat')
const axios = require('axios')
const router = require('koa-router')()
const Iconv = require('iconv').Iconv

const iconv = new Iconv('UTF-8', 'GBK')

function StringAs(string) {
	return '"' + string.replace(/(\\|\"|\n|\r|\t)/g, "\\$1") + '"';
}

router.get('/', async (ctx, next) => {

        let { shopid, paycode } = ctx.request.query

        let now = new Date()
        let timestamp = dateFormat(now, "yyyy-mm-dd HH:MM:ss")

        const signKey = 'MLIPaySign2019f790364ebce149408b05601ef580e226IPaySign2100'

        //     let contentBuf =  Buffer.from(JSON.stringify({ shopid, paycode, timestamp }))

        //     let gbkSign = iconv.decode(contentBuf, 'gbk') + signKey

        //     console.log(iconv.decode(contentBuf, 'gbk'))

        let content = JSON.stringify({ shopid, paycode, timestamp })

        let gbkSign = StringAs(content + signKey)

        console.log(gbkSign)

        let sign = md5(gbkSign)

        console.log(sign)

        let url = `http://www.crowncake.cn:18900/ipay/v2/Getway?token=HGPINConsult&method=Consult&signtype=MD5&sign=${sign}&charset=gbk&Content=json`

        let result = await axios({
                url,
                headers: {
                        "Content-Type": "charset=GBK"
                }
        })

        let res = JSON.parse(result.data)

        ctx.body = {
                res
        }

        next()
})


module.exports = router.routes()