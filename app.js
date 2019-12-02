var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
//给monggoStore传递session参数
var mongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connceted to database.')
});
//my route
var routes = require('./config/router');
var config = require('./config/config');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//控制session设置
//保存在数据库中
// app.use(session({
//   secret:'516464',
//   store:new mongoStore({
//     url:'mongodb://localhost/blog'
//   })
// }))
//保存在服务内存中
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: false,
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

//登陆拦截
app.get('*', function (req, res, next) {
  var userName = req.session.username;
  // var path = req.path;
  console.log('session',userName)
  // if (path != '/login' && path != '/regist') {
  //   if (userName) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
  //     res.render('index', { username: 'haha' });
  //   } else {
  //     res.redirect('/login');
  //   }
  // }
  next();
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
