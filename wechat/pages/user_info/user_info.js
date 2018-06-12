// pages/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    avatar:'',// 用户头像
    stuName:'',//学生姓名
    stuNumber:'',//学生学号
    currentPhone:'',//当前联系方式
    currentEmail:'',//当前邮箱
    stuMajor:'',//学生专业
    stuEndYear:'',//毕业时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfoData()
    this.getCurrentUserData()
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

  //获取当前用户个人信息
  getUserInfoData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listuserinfor',
      // url: 'http://localhost:8081/user/listuserinfor',
      url: url+'/user/listuserinfor',
      // url: 'https://www.archivebook.top:443/user/listuserinfor',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        console.log(res)
        console.log('submit success');
        if (res.data.msg == "没有权限") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录过期，请重新登录嗷！',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          });
        }

        let result = res.data.data
        this.setData({
          stuName: result.stuName,
          stuNumber: result.stuNumber,
          currentPhone: result.currentPhone,
          currentEmail: result.currentEmail,
          stuMajor: result.stuMajor,
          stuEndYear: result.stuEndYear,
        })

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
  //退出登录按钮
  logout:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  //跳转 修改密码
  gotoModify:function(){
    wx.navigateTo({
      url: '../modify_pwd/modify_pwd',
    })
  },
  //跳转 查看信息
  gotoNotice:function(){
    wx.navigateTo({
      url: '../notice/notice',
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
      url: url+'/currentUser',
      // url: 'https://www.archivebook.top:443/currentUser',
      // url: 'http://localhost:8081/currentUser',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        console.log(res)
        console.log('submit success');
        if (res.data.msg == "没有权限") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录过期，请重新登录嗷！',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          });
        }
        
        let result = res.data.data
        this.setData({
          avatar: result.avatar,// 用户头像
        })

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