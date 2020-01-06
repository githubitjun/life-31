// pages/list/list.js
import https from '../../utils/https.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null, // 分类id，将来去加载我们所需要的数据
    list:[], // 加载出来的数据
    _page:0, // 页码
    _limit:10, // 页容量
    q:'', // 关键字
    hasMore:true // 是否还有更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置id
    this.data.id = options.id
    // 动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: options.name,
    })

    // 加载第一页的数据
    this.loadData()
  },

  // 加载数据的方法，然后既给第一次加载数据使用，同时也给上拉加载更多及下拉刷新，搜索使用
  loadData(){
    if (!this.data.hasMore) return

    // 页码++
    this.data._page ++

    // 发送请求
    const url = `categories/${this.data.id}/shops?_page=${this.data._page}&_limit=${this.data._limit}&q=${this.data.q}`
    https.get(url).then(res => {
      // 关闭下拉刷新效果
      wx.stopPullDownRefresh()

      // 把之前的和此次的拼接在一起
      const newArray = [...this.data.list,...res.data]

      // 拿到服务器通过响应头返回的总条数
      const total = parseInt(res.header["X-Total-Count"])

      this.setData({
        list: newArray,
        hasMore: newArray.length < total // 判断是否还有更多数据
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 设置为最初状态
    this.data._page = 0
    this.setData({
      hasMore:true,
      list:[]
    },() => {
      // 重新加载第一页的数据
      this.loadData()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})