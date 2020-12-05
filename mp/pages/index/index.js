import { scanQRCode } from '../../utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { request } from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 处理点击扫码查询
   */
  async handleScanQRCode() {
    let scanResult = await scanQRCode()

    const paycode = scanResult.result

    const { data: resData } = await request({ url: '/mppncard', data: { paycode }, method: 'POST' })

    if (resData.meta.status === 200) {  //  查询余额成功

      let { lessmoney } = resData.data.content

      lessmoney = lessmoney.toFixed(2)

      wx.navigateTo({
        url: `../funds/funds?lessmoney=${lessmoney}`,
      })

    } else {  //  查询余额失败

      Toast.fail(resData.meta.msg)

    }

  },

  /**
   * 处理账号密码查询
   */
  handleAccountQuery() {
    wx.navigateTo({
      url: '../account/account',
    })
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