var util = require("../../utils/util.js");
Page({
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    getSmsCodeBtnTxt: "获取",
    getSmsCodeBtnColor: "#f90",
    btnLoading: false,
    smsCodeDisabled: false,

    inputAccount: '',//登录邮箱loginEmail
    activeCode: '', //邮箱有效验证码
    inputPassword1: '',//第一次输入密码
    inputPassword2: '',//确认密码
    inputPassword: '',//登录密码loginPsw    

    stuName:'', //学生姓名（身份验证）必填
    stuNumber:'', //学生学号（身份验证）必填
    mobilePhone: '',//联系方式（11位手机号）必填

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
  password1Input: function (e) {
    this.setData({
      inputPassword1: e.detail.value
    })
  },
  //获取确认密码
  password2Input:function(e) {
    this.setData({
      inputPassword2: e.detail.value
    })
  },

  //获取姓名
  stuNameInput: function (e) {
    this.setData({
      stuName: e.detail.value
    })
  },

  //获取学号
  stuNumberInput: function (e) {
    this.setData({
      stuNumber: e.detail.value
    })
  },

  //获取手机号
  mobilePhoneInput: function (e) {
    this.setData({
      mobilePhone: e.detail.value
    })
  },

  //获取验证码
  activeCodeInput: function (e) {
    this.setData({
      activeCode: e.detail.value
    })
  },

  // 注册  
  regist: function () {

    if (this.data.inputAccount.length == 0 || this.data.inputPassword1.length == 0 || this.data.inputPassword2.length == 0 || this.data.activeCode.length == 0 || this.data.stuName.length == 0 || this.data.stuNumber.length == 0 || this.data.mobilePhone.length == 0 ) {//所有输入不能为空
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '注册信息未填完整'
      });
    } else {
      if (this.checkEmail()&&this.checkPhone()){//检查账号和邮箱格式
        if (this.data.inputPassword1 != this.data.inputPassword2) {// 密码确认
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '两次密码内容不一致'
          });
        } else {
          this.setData({
            inputPassword: this.data.inputPassword1
          })
          //上传注册信息并获取服务器数据
          this.postRegistData()

        }
      }
      
    }
  },

  //上传注册信息并获取服务器数据
  postRegistData: function () {
    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/register',
      url: url+'/register',
      // url: 'http://127.0.0.1:8081/register',
      // url: 'https://www.archivebook.top:443/register',
      data: {
        loginEmail: this.data.inputAccount,
        activeCode: this.data.activeCode,
        loginPsw: this.data.inputPassword,
        stuName: this.data.stuName,
        stuNumber: this.data.stuNumber,
        mobilePhone: this.data.mobilePhone
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('submit success');
        console.log(res)
        let result = res.data
        let code=result.code
        if (code === 109) {
          //注册失败提示
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '验证码不正确'
          });

        } else if (code === 108){
          //注册失败提示
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '无该名学生用户'
          });
          
        }else{
          // 注册成功提示  
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              console.log('haha');
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({//当前页面切换成登录界面
                  url: '../login/login',
                })
              }, 1000) //延迟时间
            }
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

  //点击获取验证码
  getSmsCode: function () {
    if (this.data.inputAccount.length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '账号不能为空'
      });
    }else{
        if (this.checkEmail()){
          var that = this;

          //请求验证码并获取服务器数据
          that.postActiveCodeData()

          //180秒重置     
          var count = 180;

          var si = setInterval(function () {
            if (count > 0) {
              count--;
              that.setData({
                getSmsCodeBtnTxt: count + 's',
                getSmsCodeBtnColor: "#f2f2f2",
                smsCodeDisabled: true
              });
            } else {
              that.setData({
                getSmsCodeBtnTxt: "获取",
                getSmsCodeBtnColor: "#f90",
                smsCodeDisabled: false
              });
              count = 60;
              clearInterval(si);
            }
          }, 1000);
        }
      }
      
  },

  //请求验证码并获取服务器数据
  postActiveCodeData: function () {
    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/register/sendemail',
      url: url+'/register/sendemail',
      // url: 'http://localhost:8081/register/sendemail',
      // url: 'https://www.archivebook.top:443/register/sendemail',
      data: {
        loginEmail: this.data.inputAccount,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('submit success');
        console.log(res)
        let result = res.data
        let code=result.code
        if(code!=200){

          if (code === 107){
            //发送失败提示
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '该邮箱已发送验证码'
            });
          }else{
            //发送失败提示
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '无法发送验证码'
            });
          }
          

        }else{
          // 发送成功提示  
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
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
        })
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
  //检查邮箱格式
  checkEmail: function () {
    var email = util.regexConfig().email;
    var inputAccount = this.data.inputAccount;
    if (email.test(inputAccount)) {
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
  //检查手机格式
  checkPhone: function () {
    var phone = util.regexConfig().phone;
    var mobilePhone = this.data.mobilePhone;
    if (phone.test(mobilePhone)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },

})
