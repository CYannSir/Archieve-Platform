// pages/show_user/show_user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    stuName: '',//学生姓名
    stuNumber: '31401400',//学生学号
    currentPhone: '',//当前联系方式
    currentEmail: '',//当前邮箱
    stuMajor: '',//学生专业
    stuEndYear: '',//毕业时间

    company:'',// 公司名称
    industry:'',//行业
    occupation:'',//职位
    salary:'',//薪资
    endDate:'',//工作结束时间
    startDate:'',//工作开始时间

    companyPractice: '',// 实习公司名称
    industryPractice: '',//实习行业
    occupationPractice: '',//实习职位
    salaryPractice: '',//实习薪资
    endDatePractice: '',//实习结束时间
    startDatePractice: '',//实习开始时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 搜索结果页面跳回
    if (options && options.stuNumber) {
      this.setData({
        stuNumber: options.stuNumber
      });
    }
    this.postShowUserInfoData()
    this.postShowUserAlumniData()
    this.postShowUserPracticeData()
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

  //上传用户学号，获取用户个人信息
  postShowUserInfoData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/showuserinfor',
      url: url+'/user/showuserinfor',
      // url: 'https://www.archivebook.top:443/user/showuserinfor',
      // url: 'http://localhost:8081/user/showuserinfor',
      method: 'POST',
      data:{
        stuNumber: this.data.stuNumber,//学生学号
      },
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        var that=this
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
        that.setData({
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
  //上传用户学号，获取用户最新工作信息
  postShowUserAlumniData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/showuseralumni',
      url: url+'/user/showuseralumni',
      // url: 'https://www.archivebook.top:443/user/showuseralumni',
      // url: 'http://localhost:8081/user/showuseralumni',
      method: 'POST',
      data: {
        stuNumber: this.data.stuNumber,//学生学号
      },
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        var that = this
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

        if (res.data.data.length!=0){
          let index = res.data.data.length - 1
          let result = res.data.data[index]
          that.setData({
            company: result.company,// 公司名称
            industry: result.industry,//行业
            occupation: result.occupation,//职位
            salary: result.salary,//薪资
            endDate: result.endDate,//工作结束时间
            startDate: result.startDate,//工作开始时间
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
  //上传用户学号，获取用户最新实习信息
  postShowUserPracticeData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/showuserpractice',
      url: url+'/user/showuserpractice',
      // url: 'https://www.archivebook.top:443/user/showuserpractice',
      // url: 'http://localhost:8081/user/showuserpractice',
      method: 'POST',
      data: {
        stuNumber: this.data.stuNumber,//学生学号
      },
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        var that = this
        console.log(res)
        console.log('submit success')
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
        if (res.data.data.length!=0){
          let index = res.data.data.length - 1
          let result = res.data.data[index]
          that.setData({
            companyPractice: result.company,// 公司名称
            industryPractice: result.industry,//行业
            occupationPractice: result.occupation,//职位
            salaryPractice: result.salary,//薪资
            endDatePractice: result.endDate,//工作结束时间
            startDatePractice: result.startDate,//工作开始时间
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