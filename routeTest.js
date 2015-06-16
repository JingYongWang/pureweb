var route = require('koa-route');
var koa = require('koa');
var app = koa();




app.use(route.get('/', function *(){

	this.body = 'Test=>Koa-Route';

}));


app.listen(3300);
console.log(" localhost 3300 port start");