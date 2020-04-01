const db = require('../util/db');
class positionModel{
    constructor(){
        this.model = db.model('positions',{
            companyLogo:String,
            companyName:String,
            positionName:String,
            cityName:String,
            money:String,
            salary:String,
            createTime:String
        })
    }

    save(data){
        var result = new this.model(data);
        return result.save();
    }

    query(data){
        let {keyword,pagesize,pageno,sortname,sort} = data;
        let reg = new RegExp(keyword,'i');
        return this.model.find({$or:[{companyName:reg},{positionName:reg}]}).limit(pagesize*1).skip((pageno-1)*pagesize)
        .sort({[sortname]:sort==="des"? 1 : -1})
    }

    count(keyword){
        let reg = new RegExp(keyword,'i');
        return this.model.find({$or:[{companyName:reg},{positionName:reg}]}).count();
    }

    findOne(id){
        return this.model.findOne({_id:id});
    }

    remove(id){
        return this.model.remove({_id:id});
    }

    update(id,data){
        return this.model.update({_id:id},{$set:data});
    }

}

module.exports = new positionModel();