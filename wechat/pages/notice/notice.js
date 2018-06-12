// pages/notice/notice.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    tabs: ["通知", "消息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    notice:[],//通知
    board:[],//消息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    that.getNoticeData()
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
  //tab点击
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //获取信息
  getNoticeData: function () {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/listnotice',
      url: url+'/listnotice',
      // url: 'https://www.archivebook.top:443/listnotice',
      // url: 'http://localhost:8081/listnotice',
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
        let notice=[]
        let board=[]
        for(let i=0;i<result.length;i++){
          if(result[i].type=="通知"){
            notice.push({
              id:i,
              avatar: result[i].avatar,//图像
              title: result[i].title,//标题
              datetime: this.timeStamp2String(result[i].datetime),//创建时间
              read: result[i].read,//是否阅读
              type: result[i].type,
            })
          }else{
            board.push({
              id: i,
              avatar: result[i].avatar,//图像
              title: result[i].title,//标题
              datetime: this.timeStamp2String(result[i].datetime),//创建时间
              read: result[i].read,//是否阅读
              type: result[i].type,
            })
          }
        }
        this.setData({
          notice:notice,
          board:board,
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
  //时间戳转为datetime
  timeStamp2String:function (time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var second = datetime.getSeconds();
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  },
})