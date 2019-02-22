// pages/detail/detail.js
const AppInstance = getApp()
const serverUrl = AppInstance.globalData.serverUrl
const rootNode = {
  'type':'node',
  name:'div',
  attrs:{
    class:'test'
  },
  children:[]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemUrl:"",
    nodes: [rootNode],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options['id']
    console.log(id)
    const url = serverUrl + '/api/readme' + `?id=${id}`
    const that = this
    wx.request({
      url: url,
      success: (data) => {
        //将原来的nodes数组复制一份
        let newNodes = that.data.nodes.slice()
        console.log(that.data)
        newNodes[0].children=data.data
        that.setData({
          nodes:newNodes,
        },()=>{
          that.setData({
            loading:false
          })
        })
      },
      fail: (err) => {
        console.log('err')
        console.log(err)
      }
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
    this.setData({
      nodes:rootNode
    })
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