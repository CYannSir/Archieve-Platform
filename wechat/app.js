/*保存到app.js*/
App({
  onLaunch: function () {

  },
  globalData: {
    header: { 'Cookie': 'JSESSIONID=4E7C2020FA1A8E21405539AC6D76D340' },//请求头 保存sessionId

    url: "http://localhost:8081",//请求访问的url
    localhost: "http://localhost:8081",//本地
    ip: "http://139.196.122.103:443",//IP地址
    domain: "https://www.archivebook.top:443",//域名

    copyright:"Copyright © 2018 ZUCC-WSQ"//底部版权信息
  }
})
