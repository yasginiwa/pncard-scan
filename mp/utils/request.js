import { baseURL } from './config'

// 定义一个同时发送异步请求代码的次数
let ajaxTimes = 0;

// 异步请求的封装
export const request = params => {

    // 每发送一次异步请求，就让ajaxTimes+1 确保页面有几次请求
    ajaxTimes++;
    // 显示加载层
    wx.showLoading({
        title: "加载中...",
        mask: true,
    });
      
    // 定义公共的url 定义前面相同的url  下面拼接起来
    return new Promise((resolve,reject)=>{
        wx.request({
        	//es6中的扩展运算符
            ...params,
            // 这里将公共的url和传过来的url后半段拼接起来
            url:baseURL+params.url,
            success: result => {
                resolve(result);//返回成功数据
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                  title: '网络不给力...',
                  icon: 'none',
                  duration: 2000
                })
                reject(err);//返回失败数据
            },
            // 成功失败都会执行complete
            complete:() => {
            	// 这里的ajaxTimes--是确保一个页面里的请求都结束了才关闭加载层
            	// 如果没有ajaxTimes--和if的判断，会加载一条请求后就关闭加载层
                ajaxTimes--
                if(ajaxTimes === 0){
                    // 关闭加载层
                    wx.hideLoading();
                }
            }
        })
    })
}