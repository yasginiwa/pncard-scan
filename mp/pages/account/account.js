// pages/account/account.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { request } from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNo: '',
    cardPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 根据输入的账号密码查询余额
   */
  async handleAccountQuery() {

    const { cardNo, cardPassword } = this.data

    if (!cardNo || !cardPassword) {

      Toast.fail('账号密码不能为空')
      return

    } else {
      //  拼接卡号密码为二维码扫描内容
      let paycode = `PN${cardNo}${cardPassword}`

      const { data: res } = await request({ url: '/mppncard', data: { paycode }, method: 'POST' })

      if (res.meta.status === 200) {  //  查询余额成功
  
        let { data:cardinfo } = res
  
        wx.navigateTo({
          url: `../funds/funds?cardinfo=${JSON.stringify(cardinfo)}`,
        })
  
      } else {  //  查询余额失败
  
        Toast.fail(res.meta.msg)
  
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      cardNo: '',
      cardPassword: ''
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})