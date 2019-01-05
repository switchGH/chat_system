var express = require('express');
const moment = require('moment');
const connection = require('../model/mysqlConnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = 'SELECT B.board_id, B.user_id, B.title, ifnull(U.user_name, \'名無し\') AS user_name, DATE_FORMAT(B.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards B LEFT OUTER JOIN users U ON B.user_id = U.user_id ORDER BY B.created_at DESC';
  connection.query(query, function(err, rows){
    console.log(rows);
    res.render('index', {
      title: '@channel',
      boardList: rows
    });
  });
});

router.post('/', function(req, res, next){
  let title = req.body.title;
  let userId = req.session.user_id? req.session.user_id: 0;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  //console.log(createdAt);
  let query = 'INSERT INTO boards (user_id, title, created_at) VALUES ("' + userId + '", ' + '"' + title + '", ' + '"' + createdAt + '")';
  //console.log(query);
  connection.query(query, function(err, rows){
    //console.log(err);
    res.redirect('/');
  });
});

module.exports = router;
