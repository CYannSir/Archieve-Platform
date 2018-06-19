Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyright: getApp().globalData.copyright,//版权
    
    searchValue: '',
    searchResult:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 搜索页面跳回
    if (options && options.searchValue) {
      this.setData({
        searchValue: options.searchValue
      });
      this.postSearchData()
    }
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
  onPullDownRefresh:function() {//下拉刷新
    this.postSearchData(() => {
      wx.stopPullDownRefresh()
    })
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
  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  },
  
  //获取搜索结果
  postSearchData: function (callback) {
    var header = getApp().globalData.header; //获取app.js中的请求头
    var SessionId = header.Cookie//获取保存的SessionId
    console.log(SessionId)

    var url = getApp().globalData.url; //获取app.js中的url

    wx.request({
      // url: 'http://139.196.122.103:8081/home/search',
      url: url+'/home/search',
      // url: 'https://www.archivebook.top:443/home/search',
      // url: 'http://localhost:8081/home/search',
      method: 'POST',
      data:{
        stuName: this.data.searchValue,//学生名字
        stuClass: this.data.searchValue,//专业班级
        stuMajor: this.data.searchValue,//学生专业
        stuNumber: this.data.searchValue,//学生学号
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
          let result = res.data.data
          let searchResult=[]
          if(result.length==0){
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '没有搜到什么，请重新搜索~',
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../search/search',
                  })
                }
              }
            });
          }else{
            for (let i=0;i<result.length;i++){
              if (result[i].tag == "Practice" || result[i].tag == "Intern") {//区分实习生和正式职员，若为实习生，则传“Intern”，正式员工，传空
                searchResult.push({
                  stuId: result[i].stuNumber,//学号
                  stuName: result[i].stuName,//学生姓名
                  stuMajor: "专业：" + result[i].stuMajor,//学生专业
                  stuClass: "班级：" + result[i].stuClass,//学生班级
                  stuNumber: "学号：" + result[i].stuNumber,//学号
                  avatar: result[i].avatar,//个人头像
                  tag: "状态：实习中",
                })
              }else{
                searchResult.push({
                  stuId: result[i].stuNumber,//学号
                  stuName: result[i].stuName,//学生姓名
                  stuMajor: "专业：" + result[i].stuMajor,//学生专业
                  stuClass: "班级：" + result[i].stuClass,//学生班级
                  stuNumber: "学号：" + result[i].stuNumber,//学号
                  avatar: result[i].avatar,//个人头像
                  tag: "状态：工作中",
                })
              }
              
            }
            this.setData({
              searchResult: searchResult,
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
        callback && callback();
      }

    })
  },
})