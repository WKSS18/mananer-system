import userTpl from '../views/user.html';
import handlebar from 'handlebars';
import '../style/user.scss'
import { post, get } from '../model/http';
class userController{
    constructor(){
        this.user={
            islogin:false,
            username:'wh',
            loginstatus:false
        }
        this.render();
        this. _islogin();
        this._initEvent();
    }
    render(){
        let html = handlebar.compile(userTpl)(this.user);
        $('#user-container').html(html);
    }
    _initEvent(){
        let $usercontainer = $('#user-container');
        $usercontainer.on('click','#login',()=>this._setTit("登录",true));
        $usercontainer.on('click','#register',()=>this._setTit("注册",false));
        $usercontainer.on('click','#btn-submit',()=>this._btnSubmit());
        $usercontainer.on('click','#logout',()=>this._logout());
    }

    _setTit(tit,loginstatus){
        $('.box-title').html(tit);
        this.user.loginstatus = loginstatus;
    }

    // 登录注册
    async _btnSubmit(){
        var url = '/api/user/login';
        if(!this.user.loginstatus){
            var url = '/api/user/register';
        }
        var parmas = $('#form-user-data').serialize();
        console.log(parmas);
        let rs = await post(url,parmas);
        
        if(rs.code===1){
            alert(rs.message);

            // 获取token
            let token = rs.xhr.getResponseHeader("x-access-token")
            console.log(token);
            if(token){
                localStorage.setItem('token',token);
            }

            
            this.user.username = rs.username;
            this.user.islogin = true;
            $('#user-name').html(rs.username);
            this.render();
        }
    }

    async _logout(){
        let rs = await get('/api/user/logout');
        alert(rs.message);
        if(rs.code===1){
            this.user.username = '';
            this.user.islogin = false;
            $('#user-name').html("");
            this.render();
        }
    }

    async _islogin(){
        let rs = await get('/api/user/islogin');
        if(rs.code===1){
            this.user.username = rs.username;
            this.user.islogin = true;
            this.render();
        }
    }


}
export default new userController();