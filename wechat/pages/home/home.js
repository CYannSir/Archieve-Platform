// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    inputShowed: false,
    inputVal: "",
    name:'',
    searchValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    //获取当前用户信息
    that.getCurrentUserData()

    // 搜索页面跳回
    if (options && options.searchValue) {
      this.setData({
        searchValue: "搜索：" + options.searchValue
      });
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
  
  },

  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  },
 
  //获取当前用户信息
  getCurrentUserData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId) 

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/currentUser',
      // url: 'https://www.archivebook.top:443/currentUser',
      url: url+'/currentUser',
      // url: 'http://localhost:8081/currentUser',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
        'Cookie':SessionId
      },
      success: res=> {
        console.log(res)
        console.log('submit success');
        if(res.data.msg=="没有权限"){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录过期，请重新登录嗷！',
            success:function(res){
              if(res.confirm){
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          });
        }else{
          let result = res.data.data
          this.setData({
            name: "Hi，" + result.name,
          })
        }

      },
      fail: function (err) {
        console.log(err)
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },

})