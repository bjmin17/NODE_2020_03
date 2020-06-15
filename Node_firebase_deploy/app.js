//var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bbsRouter = require("./routes/bbsRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bbs", bbsRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

/*
firebase에 nodejs 프로젝트를 deploy 하기 위해서
app.js functions/index.js로 이동하고
module.exports = app 대신
exports.application = firebase...
으로 변경
exports하는 application 이름은
프로젝트 root firebase.json에 명시해주어야 한다.

index.js에는 꼭 필요한 미들웨어만 남기고
나머지는 삭제해주는 것이 좋다.
미들웨어가 많으면 호환성 등의 문제를 일으키기 쉽다.
*/
