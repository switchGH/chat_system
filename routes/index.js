var express = require('express');
const moment = require('moment');
const connection = require('../model/mysqlConnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'チャットしよう' });
});

router.post('/', function(req, res, next){
  let title = req.body.title;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  //console.log(createdAt);
  let query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows){
    res.redirect('/');
  });
});

module.exports = router;
