const userMd = require('../util/db')
class userModel{
    constructor(){
        this.model = userMd.model('users',{
            username:String,
            password:String
        })
    }
    // 查找一条数据
    findOne(data){
        return this.model.findOne({username:data});
    }
    // 添加一条数据
    save(data){
        let result = new this.model(data);
        return result.save();
    }
    
}
module.exports = new userModel();