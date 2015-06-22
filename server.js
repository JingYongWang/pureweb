var koa = require('koa');
var app = koa();
var route = require('koa-route')
var mount = require('koa-mount'); 
var logger = require('koa-logger');
var server = require('koa-static-folder');
var bodyParser = require("koa-bodyparser");
//資料庫套件
var co      = require('co');
var monk    = require('monk');
var comonk  = require('co-monk');
var db      = monk('localhost/test'); //在預設test的資料庫裡
var passwordPure   = comonk(db.get('passwordPure')); //passwordPure則是其中一個collect之一



var mime = { ".css":"text/css", ".html": "text/html", ".htm":"text/html", ".jpg":"image/jpg", ".png":"image/png", ".gif":"image/gif", ".pdf":"application/pdf"};

function fileMimeType(path) {
  for (var tail in mime) {
    if (path.endsWith(tail))
      return mime[tail];
  }
}

//var view = require('co-view');
//var body = require('co-body');
app.use(logger());
app.use(bodyParser());

app.use(server('./web')); 
/*
app.use(route.get('/', function *(){
	this.redirect('/web/pure.html');
	
}));
*/

app.use(route.get('/', function *(){
  this.redirect('/web/SPA.html');
  
}));

function response(res, code, msg) {
  res.status = code;
  res.set({'Content-Length':''+msg.length,'Content-Type':'text/plain'});
  res.body = msg;
  console.log("response: code="+code+"\n"+msg+"\n");
}

app.use(route.post("/passwordPure", function *login() {
  var req = this.request,
      res = this.response;
  var pd = this.request.body.pd;
  var user = this.request.body.user;
  //console.log("/password path=%s", this.path);
  var objs = yield passwordPure.find({user:user}); 
  
  if (objs[0].password === pd) {
  	response(this.response, 200, JSON.stringify(objs[0]));    
// 	response(this.response, 200, "登入成功"+objs[0].type);
  }else{
	response(this.response, 404, "失敗!!!!!!!");
  }
 
}));

app.use(route.post("/logout", function *logout() {
  var req = this.request,
      res = this.response;
  this.session = null;
  response(res, 200, "logout success!");
}));


  app.listen(3100);
console.log(" localhost 3100 port start");






