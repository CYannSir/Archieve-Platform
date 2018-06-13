/*保存到app.js*/
App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    header: { 'Cookie': 'JSESSIONID=6202019FF9FF4B485E0BCFAA1BE8B34D' },//请求头 保存sessionId

    url: "https://www.archivebook.top:443",//请求访问的url
    localhost: "http://localhost:8081",//本地
    ip: "http://139.196.122.103:443",//IP地址
    domain: "https://www.archivebook.top:443",//域名

    copyright:"Copyright © 2018 ZUCC-WSQ",//底部版权信息

    hasLogin: false
  }
})
