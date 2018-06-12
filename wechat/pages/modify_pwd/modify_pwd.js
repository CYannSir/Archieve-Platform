// pages/modify_pwd/modify_pwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    showTopTips: false,
    password:'',//旧密码
    loginPsw1:'',//新密码第一次
    loginPsw2:'',//新密码确认
    loginPsw:'',//新密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  // 获取输入旧密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //获取新密码第一次
 loginPsw1Input: function (e) {
    this.setData({
      loginPsw1: e.detail.value
    })
  },
  //获取新密码确认
  loginPsw2Input: function (e) {
    this.setData({
      loginPsw2: e.detail.value
    })
  },

  modifyPwd:function(){
    if (this.data.password == 0 || this.data.loginPsw1 == 0 || this.data.loginPsw2 == 0) {//所有输入不能为空
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '所有输入不能为空'
      });
    }else{
      if (this.data.loginPsw1 != this.data.loginPsw2) {// 密码确认
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '两次密码内容不一致'
        });
      } else {
        this.setData({
          loginPsw: this.data.loginPsw1
        })
        //上传修改密码信息并获取服务器数据
        this.postModifyPwdData()

      }
    }
  },
  //上传修改密码信息
  postModifyPwdData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/modifypwd',
      url: url+'/modifypwd',
      // url: 'https://www.archivebook.top:443/modifypwd',
      // url: 'http://localhost:8081/modifypwd',
      method: 'POST',
      data:{
        password: this.data.loginPsw,//新密码
        loginPsw: this.data.password,//旧密码
      },
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
        
        let result = res.data
        let code=result.code
        if(code!=200){
          if(code==105){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '密码错误'
            });
          }
          
        }else{
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
          })
        }

      },
      fail: function (err) {
        console.log(err)
        console.log('submit fail')
        // 失败提示  
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求失败'
        });
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
})