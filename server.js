var koa = require('koa');
var app = koa();
var route = require('koa-route')
var mount = require('koa-mount'); 
var logger = require('koa-logger');
var server = require('koa-static-folder');
var co      = require('co');
var monk    = require('monk');
var comonk  = require('co-monk');
var db      = monk('localhost/test');
var password   = comonk(db.get('password'));

//var view = require('co-view');
//var body = require('co-body');
app.use(logger());


app.use(server('./web')); 

app.use(route.get('/', function *(){
	this.redirect('/web/pure.html');
	
}));

app.use(route.post("/password", function *login() {
  var req = this.request,
      res = this.response;
  var pd = this.request.body.password;
  var user = this.request.body.user;
  console.log("/password path=%s", this.path);
  var objs = yield password.find({}); 

  if(objs[0].passwordList[0].password == pd)
	   {
	      if(objs[0].passwordList[0].user == user)
		  {
		     response(this.response, 200, "學生登入成功");
		  }else{
		     response(this.response, 404, "登入失敗!!");
		  }
	   }else{
	       response(this.response, 200, "登入失敗!!");  
	   }
}));

  app.listen(3100);
console.log(" localhost 3100 port start");






