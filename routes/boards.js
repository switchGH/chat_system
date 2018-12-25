const express = require('express');
const moment = require('moment');
const router = express.Router();
const connection = require('../model/mysqlConnection');

router.get('/:board_id', function(req, res, next){
  let boardId = req.params.board_id;
  let getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  let getMessagesQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages WHERE board_id = ' + boardId;
  connection.query(getBoardQuery, function(err, board){
    connection.query(getMessagesQuery, function(err, messages){
      res.render('board', {
        title: board[0].title,
        board: board[0],
        messageList: messages
      });
    });
  });
});

router.post('/:board_id', function(req, res, next){
  let message = req.body.message;
  let boardId = req.params.board_id;
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  let query = 'INSERT INTO messages (message, board_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + createdAt + '")';
  connection.query(query, function(err, rows){
    res.redirect('/boards/' + boardId);
  });
});

module.exports = router;
