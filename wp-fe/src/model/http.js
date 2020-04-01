const get = (url,data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"GET",
            data,
            url,
            success:(result)=>{
                resolve(result);
            },
            error:(err)=>{
                reject(err);
            }
        })
    })
}
const post = (url,data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"POST",
            data,
            url,
            success:(res,status,xhr)=>{
                res.status=status;
                res.xhr = xhr;
                resolve(res);
            },
            error:(err)=>{
                reject(err);
            }
        })
    })
}

export{
    get,
    post
}