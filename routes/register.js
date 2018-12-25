const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('../model/mysqlConnection');

router.get('/', function(req, res, next){
  res.render('register', {
    title: '新規ユーザー登録'
  });
});

router.post('/', function(req, res, next){
  let userName = req.body.user_name;
  let email = req.body.email;
  let password = req.body.password;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
  let registerQuery = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")'; // 変更
  connection.query(emailExistsQuery, function(err, email) {
    let emailExists = email.length;
    if (emailExists) {
      res.render('register', {
        title: '新規ユーザー登録',
        emailExists: '既に登録されているメールアドレスです'
      });
    } else {
      connection.query(registerQuery, function(err, rows) {
        res.redirect('/login');
      });
    }
  });
});
module.exports = router;
