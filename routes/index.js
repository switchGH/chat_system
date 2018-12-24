var express = require('express');
const moment = require('moment');
const connection = require('../model/mysqlConnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
  connection.query(query, function(err, rows){
    console.log(rows);
    res.render('index', {
      title: 'チャットしよう',
      boardList: rows
    });
  });
});

router.post('/', function(req, res, next){
  let title = req.body.title;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  //console.log(createdAt);
  let query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '", ' + '"' + createdAt + '")';
  //console.log(query);
  connection.query(query, function(err, rows){
    //console.log(err);
    res.redirect('/');
  });
});

module.exports = router;
