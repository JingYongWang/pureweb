var app = require('koa')();
var router = require('koa-router')();

app
  .use(router.routes())
  .use(router.allowedMethods());


  router
  .get('/', function *(next) {
    this.body = 'Test=>Koa-Router';
  })

  app.listen(3200);
console.log(" localhost 3200 port start");