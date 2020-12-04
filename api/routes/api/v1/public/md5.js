const md5 = require('md5')
const dateFormat = require('dateformat')
const axios = require('axios')
const router = require('koa-router')()
const Iconv = require('iconv').Iconv;

let iconv = new Iconv('utf-8', 'gbk')


function Utf8ToUnicode(strUtf8)
{
        var bstr = "";
        var nTotalChars = strUtf8.length;        // total chars to be processed.
        var nOffset = 0;                                        // processing point on strUtf8
        var nRemainingBytes = nTotalChars;        // how many bytes left to be converted
        var nOutputPosition = 0;
        var iCode, iCode1, iCode2;                        // the value of the unicode.

        while (nOffset < nTotalChars)
        {
                iCode = strUtf8.charCodeAt(nOffset);
                if ((iCode & 0x80) == 0)                        // 1 byte.
                {
                        if ( nRemainingBytes < 1 )                // not enough data
                                break;

                        bstr += String.fromCharCode(iCode & 0x7F);
                        nOffset ++;
                        nRemainingBytes -= 1;
                }
                else if ((iCode & 0xE0) == 0xC0)        // 2 bytes
                {
                        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                        if ( nRemainingBytes < 2 ||                        // not enough data
                                 (iCode1 & 0xC0) != 0x80 )                // invalid pattern
                        {
                                break;
                        }

                        bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (         iCode1 & 0x3F));
                        nOffset += 2;
                        nRemainingBytes -= 2;
                }
                else if ((iCode & 0xF0) == 0xE0)        // 3 bytes
                {
                        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                        iCode2 =  strUtf8.charCodeAt(nOffset + 2);
                        if ( nRemainingBytes < 3 ||                        // not enough data
                                 (iCode1 & 0xC0) != 0x80 ||                // invalid pattern
                                 (iCode2 & 0xC0) != 0x80 )
                        {
                                break;
                        }

                        bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
                                        ((iCode1 & 0x3F) <<  6) |
                                        (iCode2 & 0x3F));
                        nOffset += 3;
                        nRemainingBytes -= 3;
                }
                else                                                                // 4 or more bytes -- unsupported
                        break;
        }

        if (nRemainingBytes != 0)
        {
                // bad UTF8 string.
                return "";
        }

        return bstr;
}



router.get('/', async (ctx, next) => {
    let { shopid, paycode } = ctx.request.query

    let now = new Date()
    let timestamp = dateFormat(now, "yyyy-mm-dd HH:MM:ss")  

    const signKey = 'MLIPaySign2019f790364ebce149408b05601ef580e226IPaySign2100'
    
    let content = {shopid, paycode, timestamp}

    let gbkSign = Utf8ToUnicode(JSON.stringify(content) + signKey)

    console.log(gbkSign)

    let sign = md5(gbkSign)

    let url = `http://www.crowncake.cn:18900/ipay/v2/Getway?token=HGPINConsult&method=Consult&signtype=MD5&sign=${sign}&charset=gbk&Content=json`
    
    let result = await axios.get(url)

    let res = JSON.parse(result.data)

    ctx.body = {
        res
    }

    next()
})


module.exports = router.routes()