
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');

var path = require('path');
var stat = require('koa-static');
var statCache = require('koa-static-cache');

var app = koa();

// "database"

var posts = [];

// middleware

app.use(logger());

// route middleware
/*
app.use(stat('css/layouts'));
app.use(stat('jquery-1.10.2.min.js'));
app.use(stat( 'jquery-ui-1.10.3.custom.min.js'));
app.use(stat( 'main.js'));
app.use(stat('index.js'));
*/

/*
app.use(statCache(path.join(__dirname, 'web'),{
  maxAge:365*24*60*60
}));
*/
/*
app.use(stat(__dirname + '/web/css'));

app.use(stat(__dirname + '/web/js'));
*/

app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));


// route definitions

/**
 * Post listing.
 */

function *list() {
  this.body = yield render('list', { posts: posts });
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  var post = posts[id];
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
}

/**
 * Create a post.
 */

function *create() {
  var post = yield parse(this);
  var id = posts.push(post) - 1;
  post.created_at = new Date;
  post.id = id;
  this.redirect('/');
}

// listen

app.listen(3100);
console.log('listening on port 3100');