var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('list', {title : '도서정보'});
  // res.redirect("/book/list",{title : '도서정보', book:book, books:books})
});

module.exports = router;
