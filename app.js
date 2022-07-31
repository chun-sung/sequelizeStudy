var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sequelize = require('./models/index.js').sequelize;        // 연결 1


var indexRouter = require('./routes/index');
// 동기    http://localhost:3000/members/~
var memberSyncRouter = require('./routes/member-sync');
// 비동기  http://localhost:3000/member/~
var memberAsyncRouter = require('./routes/member-async');


var app = express();
sequelize.sync({force: false})                                 // 연결 2
 .then(() => {
    console.log('ORM 준비 완료')
 })
 .catch((err) => {
    console.error(err);
 });
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 회원 정보 동기 관리 라우팅 파일 기본 URL 주소 
app.use('/members', memberSyncRouter);

// 회원 정보 비동기 관리 라우팅 파일 기본 URL 주소 
app.use('/member', memberAsyncRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
