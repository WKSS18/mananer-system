const userModel = require('../model/userModel');
const crypto = require('crypto-js');
const jwt  = require('jsonwebtoken');
class userController{

    _createJWT(username){
        let token = jwt.sign(username,'wopinwang');
        return token;
    }

    // 封装加密方法
    ciphertext(pwd){
        return crypto.AES.encrypt(pwd, 'secret key 123').toString()
    }
    // 封装解密方法
    originalText(newpwd){
        return crypto.AES.decrypt(newpwd, 'secret key 123').toString(crypto.enc.Utf8);
    }
    // 用户注册
    async register(req,res){
        let {username,password} = req.body;
        // 用户名长度判断
        if(!/^\w{2,10}$/.test(username)){
            res.send({
                code:-1,
                message:"用户名长度为2-10位"
            })
            return;
        }
        // 用户名重复判断
        var rs = await userModel.findOne(username);
        if(rs){
            res.send({
                code:-1,
                message:"用户名重复"
            })
            return;
        }
        // 密码加密后存储到数据库中
        password = this.ciphertext(password);
        // 插入数据到数据库中
        let user = await userModel.save({username,password});
        if(user){
            req.session.username = username;
            res.send({
                code:1,
                message:"注册成功",
                username:username
            })
        }else{
            res.send({
                code:-1,
                message:"注册失败"
            })
        }
    }

    // 用户登录
    async login(req,res){
        let {username,password}=req.body;
        var rs = await userModel.findOne(username);
        console.log(rs)
        if(!rs){
            res.send({
                code:-1,
                message:"用户名不存在"
            })
            return;
        }
        // 将用户登录的密码和数据库加密的密码作比对
        let oldps = this.originalText(rs['password']);
        if(oldps === password){

            // 生成token
            console.log(rs['username'])
            let token = this._createJWT(rs['username']);
            // 向header里面添加一个自定义的字段
            res.set('X-ACCESS-TOKEN',token);

            req.session.username = rs['username'];

            res.send({
                code:1,
                message:"登录成功",
                username:rs['username']
            })
        }else{
            res.send({
                code:-1,
                message:"密码错误"
            })
            return;
        }
    }

    // 用户退出
    async logout(req,res){
        req.session.username = null;
        res.send({
            code:1,
            message:"用户退出成功"
        })
    }

    // 用户的登录状态判断
    islogin(req,res){
        if(req.session.username){
            res.send({
                code:1,
                message:"用户已经登录",
                username:req.session.username
            })
        }else{
            res.send({
                code:-1,
                message:"用户未登录"
            })
        }
    }
}

module.exports = new userController();