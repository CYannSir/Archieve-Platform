Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框

    avatar: '',// 用户头像
    stuName: '',//学生姓名
    stuNumber: '',//学生学号
    currentEmail: '',//当前邮箱

    accountAddress:'',//户口流向地址
	  accountDate:'',//户口流向时间

    account: [],//户口信息 数组

    stuNumberInput:'',
    accountAddressInput: '',//户口流向地址
    accountDateInput: '',//户口流向时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentUserData()
    this.getUserInfoData()
    this.getUserAccountData()

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
        } else {
          let result = res.data.data
          this.setData({
            avatar: result.avatar,// 用户头像
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
  //获取当前用户个人信息
  getUserInfoData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listuserinfor',
      url: url+'/user/listuserinfor',
      // url: 'https://www.archivebook.top:443/user/listuserinfor',
      // url: 'http://localhost:8081/user/listuserinfor',
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
        } else {
          let result = res.data.data
          this.setData({
            stuName: result.stuName,
            stuNumber: result.stuNumber,
            currentEmail: result.currentEmail,
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
  //获取当前用户户口信息
  getUserAccountData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listaccount',
      url: url+'/user/listaccount',
      // url: 'https://www.archivebook.top:443/user/listaccount',
      // url: 'http://localhost:8081/user/listaccount',
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
        } else {
          let result = res.data.data
          if (result.length == 0) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '没有户口记录，可以更新一下哦~'
            });
          } else {
            let account = []
            for (let i = 0; i < result.length; i++) {
              account.push({
                id: "流向记录" + (i + 1),
                accountAddress: result[i].accountAddress,
                accountDate: result[i].accountDate,

              })
            }
            this.setData({
              account: account,
            })

            let index = account.length - 1
            this.setData({
              accountAddress: account[index].accountAddress,
              accountDate: account[index].accountDate,
            })
          }
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

  //hiddenmodalput弹出框
  modalInput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //获取输入学生学号
  stuNumberInput: function (e) {
    this.setData({
      stuNumberInput: e.detail.value
    })
  },
  //获取输入流向地址
  accountAddressInput: function (e) {
    this.setData({
      accountAddressInput: e.detail.value
    })
  },
  //获取输入流向时间
  accountDateChange: function (e) {
    this.setData({
      accountDateInput: e.detail.value
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
    if (this.data.accountAddressInput.length == 0 || this.data.accountDateInput.length == 0 ) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '所有输入不能为空'
      });
    } else {
      //更新当前用户户口信息
      this.postUserAccountData()
    }

  },
  //更新当前用户户口信息
  postUserAccountData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/addaccount',
      // url: 'http://localhost:8081/user/addaccount',
      url: url+'/user/addaccount',
      // url: 'https://www.archivebook.top:443/user/addaccount',
      method: 'POST',
      data: {
        stuNumber: this.data.stuNumber,
        accountAddress: this.data.accountAddressInput,
        accountDate: this.data.accountDateInput,
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
        } else {
          if (res.data.code != 200) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '上传失败'
            });
          } else {
            // 更新成功提示  
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000,
            })

            this.getUserAccountData()

            this.setData({
              hiddenmodalput: true
            });

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

})