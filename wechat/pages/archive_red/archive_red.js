// pages/archive_red/archive_red.js
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
    
    avatar:'',// 用户头像
    stuName:'',
    stuNumber:'',
    currentEmail: '',//当前邮箱

    joinDate:'',//成为党员时间
    activistDate:'',//成为积极分子时间
    introducer:'',//入党介绍人A
    introducerB:'',//入党介绍人B
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfoData()
    this.getRedArchiveData()
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
        }
        
        let result = res.data.data
        this.setData({
          stuName: result.stuName,
          stuNumber: result.stuNumber,
          currentEmail: result.currentEmail,
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

  //获取当前用户党员信息
  getRedArchiveData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/user/listredarchive',
      url: url+'/user/listredarchive',
      // url: 'https://www.archivebook.top:443/user/listredarchive',
      // url: 'http://localhost:8081/user/listredarchive',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Cookie': SessionId
      },
      success: res => {
        console.log(res)
        console.log('submit success');
        let result = res.data.data[0]
        this.setData({
          joinDate: result.joinDate,//成为党员时间
          activistDate: result.activistDate,//成为积极分子时间
          introducer: result.introducer,//入党介绍人A
          introducerB: result.introducerB,//入党介绍人B
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
  logout: function () {
    wx.redirectTo({
      url: '../login/login',
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
        let result = res.data.data
        this.setData({
          avatar: result.avatar,// 用户头像
        })

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