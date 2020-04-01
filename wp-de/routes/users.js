var express = require('express');
var router = express.Router();
var user = require('../controller/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户注册接口
router.post('/register',user.register.bind(user));

// 用户登录接口
router.post('/login',user.login.bind(user));

// 用户退出接口
router.get('/logout',user.logout.bind(user));

// 用户登录状态判断
router.get('/islogin',user.islogin.bind(user));

module.exports = router;
