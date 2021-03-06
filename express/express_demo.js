var express = require('express')
var app = express()
var http = require('http')
var request = require('request')

app.use(function log(req, res, next) {
  req.lmq = 'lmq';
  next()
})
app.get('/', function(req, res, next) {
   console.log('主页 GET 请求');
   console.log(req.lmq);
   console.log(req.originalUrl);
   res.send("HELLO HOME GET");
   next()
})

app.get('/', function(req, res, next) {
  console.log(12);
})

app.get('/del_user', function(req, res) {
   console.log('del_user 页面请求');
   console.log(req.originalUrl);
   res.send('删除页面')
})

app.get('/list', function(req, res) {
   console.log('list 页面请求');
   console.log(req.originalUrl);
    res.send('用户列表页面')
})

app.get('/ab*cd', function(req, res) {
  console.log('ab*cd 页面请求');
  console.log(req.originalUrl);
   res.send('正则页面请求')
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//创建服务
http.createServer(app).listen(8081,'127.0.0.1', function(){
  console.log('server start!!');
})


//创建请求
var uriStr = ''
var options = {
  method: "GET",
  baseUrl: 'http://127.0.0.1:8081',
  url: '/'+uriStr
}
request(options, function(err, res, body){
    console.log('---------');
    console.log(body);
})
