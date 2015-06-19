var koa = require('koa');
var app = koa();
var route = require('koa-route')
var mount = require('koa-mount'); 
var logger = require('koa-logger');
var server = require('koa-static-folder');


//var view = require('co-view');
//var body = require('co-body');
app.use(logger());


app.use(server('./web')); 

app.use(route.get('/', function *(){
	this.redirect('/web/pure.html');
	
}));

  app.listen(3100);
console.log(" localhost 3100 port start");






