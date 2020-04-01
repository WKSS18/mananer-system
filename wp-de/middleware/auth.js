const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    if (req.session.username) {
        try {
            let token = req.get('x-access-token');
            console.log(token);
            let rs = jwt.verify(token, 'wopinwang');
            if (rs === req.session.username) {
                next();
            } else {
                res.send({
                    code: 401,
                    message: "非法访问"
                })
            }
        } catch (error) {
            log.error(req.session.username + " 登录失败 " + error.message)
            res.send({
                code: 401,
                message: "非法访问"
            })
        }
    }else{
        res.send({
            code: 401,
            message: "非法访问"
        })
    }
}
module.exports = auth;