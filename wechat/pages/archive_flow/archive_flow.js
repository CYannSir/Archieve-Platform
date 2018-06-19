Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 侧边栏
    open: false,
    mark: 0,
    newmark: 0,
    istoright: true,

    copyright: getApp().globalData.copyright,//版权
    
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框

    avatar: '',// 用户头像
    stuName: '',//学生姓名
    stuNumber: '',//学生学号
    currentEmail: '',//当前邮箱

    unit:'',//档案流向单位
    unitAddress:'',// 档案流向地址
    flowDate:'',//档案流向时间

    flow: [],//工作信息 数组

    stuNumberInput: '',
    unitInput: '',//档案流向单位
    unitAddressInput: '',// 档案流向地址
    flowDateInput: '',//档案流向时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentUserData()
    this.getUserInfoData()
    this.getUserArchiveData()

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
  //获取当前用户实习信息
  getUserArchiveData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listarchive',
      url: url+'/user/listarchive',
      // url: 'https://www.archivebook.top:443/user/listarchive',
      // url: 'http://localhost:8081/user/listarchive',
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
              content: '没有流向记录，可以更新一下哦~'
            });
          } else {
            let flow = []
            for (let i = 0; i < result.length; i++) {
              flow.push({
                id: "流向记录" + (i + 1),
                unit: result[i].unit,
                unitAddress: result[i].unitAddress,
                flowDate: result[i].flowDate,

              })
            }
            this.setData({
              flow: flow,
            })

            let index = flow.length - 1
            this.setData({
              unit: flow[index].unit,
              unitAddress: flow[index].unitAddress,
              flowDate: flow[index].flowDate,
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
  //获取输入流向单位
  unitInput: function (e) {
    this.setData({
      unitInput: e.detail.value
    })
  },
  //获取输入流向地址
  unitAddressInput: function (e) {
    this.setData({
      unitAddressInput: e.detail.value
    })
  },
  //获取输入流向时间
  flowDateChange: function (e) {
    this.setData({
      flowDateInput: e.detail.value
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
    if (this.data.unitInput.length == 0 || this.data.unitAddressInput.length == 0 || this.data.flowDateInput.length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '所有输入不能为空'
      });
    } else {
      //更新当前用户实习信息
      this.postUserArchiveData()
    }

  },
  //更新当前用户实习信息
  postUserArchiveData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/addarchive',
      url: url+'/user/addarchive',
      // url: 'https://www.archivebook.top:443/user/addarchive',
      // url: 'http://localhost:8081/user/addarchive',
      method: 'POST',
      data: {
        stuNumber:this.data.stuNumber,
        unit: this.data.unitInput,
        unitAddress: this.data.unitAddressInput,
        flowDate: this.data.flowDateInput,
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

            this.getUserArchiveData()

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
  // 侧边栏
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件

    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;

    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },
})