import menuTpl from '../views/menu.html';
import router from '../router/index';
import controller from '../controller/userController';
import { get } from '../model/http';
import { compile } from 'handlebars';
class Index {
    constructor() {
        this.render();
        this._initEvent();
        this.startSocket();
    }
    render() {
        $('#menu-container').html(menuTpl);
    }
    // 全局判断401非法访问
    _initEvent() {
        $.ajaxSetup({
            // 全局设置token
            beforeSend(xhr, setting) {
                let token = localStorage.getItem('token');
                // 设置token值
                xhr.setRequestHeader('x-access-token', token);
            },
            complete(xhr, setting) {
                if (xhr.responseJSON.code === 401) {
                    alert(xhr.responseJSON.message);
                    // 跳转到首页
                    router.go('/index');
                }
            }
        })
    }

    startSocket() {
        let i=0;
        let html='';
        // 服务器的地址
        var socket = io("http://123.57.2.116:5300");
        socket.on('connect', function () {
          console.log('connect ...')
        })
        // 订阅消息
        socket.on('message', function (msg) {
        // 做一些界面的渲染效果
          i++;
          $('#posNum').html(i);
          $('#pos-header').html(`你有${i}条新消息`);
          html += msg.message+'<br>';
          $('#posUpdatamsg').html(html);
        })
      }
    
}
new Index();