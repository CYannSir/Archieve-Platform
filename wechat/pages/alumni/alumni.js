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

    company: '',// 公司名称
    companyAddress:'',//公司地址
    industry: '',//行业
    occupation: '',//职位
    salary: '',//薪资
    endDate: '',//工作结束时间
    startDate: '',//工作开始时间

    work:[],//工作信息 数组

    companyInput: '',// 公司名称
    companyAddressInput: '',//公司地址
    industryInput: '',//行业
    occupationInput: '',//职位
    salaryInput: '',//薪资
    endDateInput: '',//工作结束时间
    startDateInput: '',//工作开始时间

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentUserData()
    this.getUserInfoData()
    this.getUserAlumniData()
  
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
      // url: 'https://www.archivebook.top:443/currentUser',
      // url: 'http://localhost:8081/currentUser',
      url: url+'/currentUser',
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
        }else{
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
        }else{
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
  //获取当前用户工作信息
  getUserAlumniData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listalumni',
      url: url+'/user/listalumni',
      // url: 'https://www.archivebook.top:443/user/listalumni',
      // url: 'http://localhost:8081/user/listalumni',
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
        }else{
          let result = res.data.data
          if (result.length == 0) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '没有工作记录，可以更新一下哦~'
            });
          } else {
            let work = []
            for (let i = 0; i < result.length; i++) {
              work.push({
                id: "工作记录" + (i + 1),
                company: result[i].company,// 公司名称
                companyAddress: result[i].companyAddress,//公司地址
                industry: result[i].industry,//行业
                occupation: result[i].occupation,//职位
                salary: result[i].salary+"元",//薪资
                endDate: result[i].endDate,//工作结束时间
                startDate: result[i].startDate,//工作开始时间
              })
            }
            this.setData({
              work: work,
            })

            let index = work.length-1
            this.setData({
              companyAddress: work[index].companyAddress,//公司地址
              company: work[index].company,// 公司名称
              industry: work[index].industry,//行业
              occupation: work[index].occupation,//职位
              salary: work[index].salary,//薪资
              endDate: work[index].endDate,//工作结束时间
              startDate: work[index].startDate,//工作开始时间
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
  //获取输入公司名
  companyInput: function (e) {
    this.setData({
      companyInput: e.detail.value
    })
  },
  //获取输入公司地址
  companyAddressInput: function (e) {
    this.setData({
      companyAddressInput: e.detail.value
    })
  },
  //获取输入行业
  industryInput: function (e) {
    this.setData({
      industryInput: e.detail.value
    })
  },
  //获取输入薪资
  salaryInput: function (e) {
    this.setData({
      salaryInput: e.detail.value
    })
  },
  //获取输入职位
  occupationInput: function (e) {
    this.setData({
      occupationInput: e.detail.value
    })
  },
  //获取输入开始时间
  startDateChange: function (e) {
    this.setData({
      startDateInput: e.detail.value
    })
  },
  //获取输入结束时间
  endDateChange: function (e) {
    this.setData({
      endDateInput: e.detail.value
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
    if (this.data.companyInput.length == 0 || this.data.companyAddressInput.length == 0 || this.data.industryInput.length == 0 || this.data.occupationInput.length == 0 || this.data.salaryInput.length == 0 || this.data.startDateInput.length == 0 || this.data.endDateInput.length == 0 ) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '所有输入不能为空'
      });
    } else {
      //更新当前用户工作信息
      this.postUserAlumniData()
    }

  },
  //更新当前用户工作信息
  postUserAlumniData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/addalumni',
      url: url+'/user/addalumni',
      // url: 'https://www.archivebook.top:443/user/addalumni',
      // url: 'http://localhost:8081/user/addalumni',
      method: 'POST',
      data:{
        company: this.data.companyInput,// 公司名称
        companyAddress: this.data.companyAddressInput,//公司地址
        industry: this.data.industryInput,//行业
        occupation: this.data.occupationInput,//职位
        salary: this.data.salaryInput,//薪资
        endDate: this.data.endDateInput,//工作结束时间
        startDate: this.data.startDateInput,//工作开始时间
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
            // 错误提示
            if (res.data.code ==112){
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '开始时间不能晚于结束时间'
              });
            }else{
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '上传失败'
              });
            }
          } else {
            // 更新成功提示  
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000,
            })

            this.getUserAlumniData()

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