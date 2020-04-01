var express = require('express');
var router = express.Router();
var uploadfile = require('../middleware/uploadfile');
var position = require('../controller/positionController');

var auth = require('../middleware/auth');
router.use(auth);

// 查找信息
router.get('/all',position.all)

// 添加信息
router.post('/add',uploadfile,position.add);


// 查找一条信息
router.get('/findone/:id',position.findone);

// 删除信息
router.get('/remove/:id',position.remove);




// 更新信息
router.post('/update',uploadfile,position.update);


module.exports = router;