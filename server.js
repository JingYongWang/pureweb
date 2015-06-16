var koa = require('koa');
var app = koa();
var crouter = require('koa-router'); 
var router = crouter();
// var crouter = require('koa-router')()
//()為一個建構函數
var logger = require('koa-logger');
var server = require('koa-static');
//var view = require('co-view');
//var body = require('co-body');

app.use(router.routes())
app.use(router.allowedMethods());
app.use(server(./web));

router.get('/', function *(next){ 
	this.body = 'Hello World';
});

router.get('/web/song.html', function *(next){ 
	
});





app.use(logger());

  app.listen(3100);
console.log(" localhost 3100 port start");






