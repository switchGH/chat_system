var express = require('express');
const moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'チャットしよう' });
});

router.post('/', function(req, res, next){
  let title = req.body.title;
  //console.log(title);
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  //console.log(createdAt);
});

module.exports = router;
