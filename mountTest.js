var koa = require('koa');
var mount = require('koa-mount')
var Router = require('koa-router');

var app = koa();

var APIv1 = new Router();
var APIv2 = new Router();

APIv1.get('/sign-in', function *() {
  this.body = "v1";
});

APIv2.get('/sign-in', function *() {
  this.body = "v2";
});

app
  .use(mount('/v1', APIv1.middleware()))
  .use(mount('/v2', APIv2.middleware()));

    app.listen(3000);
console.log(" localhost 3000 port start");