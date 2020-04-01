const positionModel = require('../model/positionModel');
class positionController{

    async add(req,res){
        // 添加时间
        req.body.createTime = new Date().toLocaleDateString();
        let rs = await positionModel.save(req.body);
        if(rs){
            socketio.emit('message',{
                code:2,
                message:"职位信息添加成功"
            })
            res.send({
                code:1,
                message:"添加成功"
            })
        }
    }

    async all(req,res){
        let {keyword,pagesize,pageno,sortname,sort} = req.query;
        var total = await positionModel.count(keyword);
        var data = await positionModel.query(req.query);
        if(data.length>0){
            res.send({
                code:1,
                data,
                total
            })
        }else{
            res.send({
                code:-1
            })
        }
    }

    async remove(req,res){
        console.log(req.params.id)
        let rs = await positionModel.remove(req.params.id);
        if(rs.deletedCount===1){
            socketio.emit('message',{
                code:3,
                message:"职位信息删除成功"
            })
            res.send({
                code:1,
                message:"删除信息成功"
            })
        }else{
            res.send({
                code:1,
                message:"删除信息失败"
            })
        }
    }


    async findone(req,res){
        let data = await positionModel.findOne(req.params.id);
        if(data){
            res.send({
                code:1,
                data
            })
        }else{
            res.send({
                code:-1
            })
        }
    }

    async update(req,res){
        let id = req.body.id;
        console.log(req.body.id);
        delete req.body.id;
        let rs = await positionModel.update(id,req.body);
        if(rs.nModified===1){
            socketio.emit('message',{
                code:4,
                message:"职位信息更新成功"
            })
            res.send({
                code:1,
                message:"职位信息更新成功"
            })
        }else{
            res.send({
                code:-1,
                message:"职位信息更新失败"
            })
        }
    }




}
module.exports = new positionController();