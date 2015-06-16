var koa = require('koa');
var app = koa();
var crouter = require('koa-router'); //// var crouter = require('koa-router')(),為一個函數
//var route  = require('koa-route');
var logger = require('koa-logger');
var router = crouter();
//var view = require('co-view');
//var body = require('co-body');

app.use(router.routes())
app.use(router.allowedMethods());

//app.use(router(app));
router.get('/', function *(next){ 
	this.body = 'Hello World';
});

/*
app.use(route.get('/', function *(){

	this.body = 'Test';

}));
*/
app.use(logger());

  app.listen(3100);
console.log(" localhost 3100 port start");






