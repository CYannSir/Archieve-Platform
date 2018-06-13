var util = require("../../utils/util.js");
Page({
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框

    inputAccount: '',//登录邮箱loginEmail
    inputPassword: '',//登录密码loginPsw

    inputEmail:'',//忘记密码，输入的邮箱

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  // 获取输入账号  
  accountInput: function (e) {
    this.setData({
      inputAccount: e.detail.value
    })  
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      inputPassword: e.detail.value
    })
  },

  //忘记密码，hiddenmodalput弹出框
  modalInput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //获取输入邮箱
  emailInput:function(e){
    this.setData({
      inputEmail: e.detail.value
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    if (this.data.inputEmail.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '账号不能为空'
      });
    } else {
      if (this.checkEmail()){//检查邮箱格式
        //上传忘记密码信息并获取服务器数据
        this.postForgetPwdData()
      }
      
    }
    
  },

  // 登录  
  login: function () {
    
    if (this.data.inputAccount.length == 0 || this.data.inputPassword.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '账号或密码不能为空'
      });
    } else {
      //上传登录信息并获取服务器登录数据，判断是否登录成功
      this. postLoginData()
    }
  },

  //上传登录信息并获取服务器登录数据，判断是否登录成功
  postLoginData:function() {
    var that=this
    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/login',
      // url: 'http://localhost:8081/login',
      // url: 'https://www.archivebook.top:443/login',
      url: url+'/login',
      data: {
        loginEmail: this.data.inputAccount,
        loginPsw: this.data.inputPassword
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: res=> {
        console.log(res)
        console.log('submit success');
        if (parseInt(res.statusCode) === 200){//网络  请求成功
          let result = res.data.data
          let currentAuthority = result.currentAuthority
          if (currentAuthority === "guest") {//当前用户类型 利用这个判断是否登录成功 user guest
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '账号或密码错误'
            });
          } else {
            // 保存SessionId到app.js
            getApp().globalData.header.Cookie = 'JSESSIONID=' + result.SessionId;

            //登录成功提示
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                console.log('haha');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.redirectTo({//当前页面切换成主界面
                    url: '../home/home',
                  })
                }, 1000) //延迟时间
              }
            })
        }
        
          
        }

      },
      fail: function (err) {
        console.log(err)
        console.log('submit fail');
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

  //上传忘记密码信息并获取服务器数据
  postForgetPwdData: function () {
    var that = this
    var url = getApp().globalData.url; //获取app.js中的url
    
    wx.request({
      // url: 'http://139.196.122.103:8081/forgetpsw',
      // url: 'http://localhost:8081/forgetpsw',
      // url: 'https://www.archivebook.top:443/forgetpsw',
      url: url+'/forgetpsw',      
      data: {
        loginEmail: this.data.inputEmail
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: res => {
        console.log(res)
        console.log('submit success');
        let result = res.data
        let code = result.code
        if (code === 111) {

          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '账号不存在'
          });

        } else {

          // 发送成功提示  
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
          //关闭模态框
          this.setData({
            hiddenmodalput: true
          })

        }

      },
      fail: function (err) {
        console.log(err)
        console.log('submit fail');
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
  //检查邮箱格式
  checkEmail: function () {
    var email = util.regexConfig().email;
    var inputEmail = this.data.inputEmail;
    if (email.test(inputEmail)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的邮箱'
      });
      return false;
    }
  },
 
})
