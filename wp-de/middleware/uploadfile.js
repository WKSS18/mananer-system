const multer = require('multer');
const path = require('path');

var uploadfile = (req,res,next)=>{
     let fullpath = path.resolve(__dirname,'../public/positionupload');
     let filename='';
     var storage= multer.diskStorage({
         destination:function(req,file,cb){
             cb(null,fullpath);
         },
         filename:function(req,file,cb){
             console.log(file)
             let extname = path.extname(file.originalname);
             filename = file.fieldname+'-'+Date.now()+extname;
             cb(null,filename);
         }
     })   
     var upload =multer({storage}).single('companyLogo');
     upload(req,res,function(err){
         if(!req.file){
             delete req.body['companyLogo'];
             next();
             return;
         }
         if(err){
             res.send({
                 code:-1,
                 message:"图片上传失败"
             })
         }else{
             req.body.companyLogo = filename;
             next();
         }
     })
}

module.exports = uploadfile;