import positionTpl from '../views/position.html';
import positionEditTpl from '../views/positionEdit.html';
import handlebar from 'handlebars';
import '../style/position.scss'
import positionAddTpl from '../views/positionAdd.html';
import { get, post } from '../model/http'
import SMERouter from 'sme-router';
const router = new SMERouter('main-container');
class positionController {
    constructor() {
        // 对相关属性值初始化
        this.keyword = '';
        this.pagesize = 5;
        this.pageno = 1;
        this.sortname = 'salary';
        this.sort = 'des';
        this._initEvent();
    }
    async render(req, res) {
        // 如果点击了页码将会触发这个条件判断，进而能够触发get请求，更新页面的数据，达到翻页的效果
        if (req.query) {
            this.keyword = req.query.keyword;
            this.pagesize = req.query.pagesize;
            this.pageno = req.query.pageno;
            this.sortname = req.query.sortname;
            this.sort = req.query.sort;
        }
        this.res = res;
        let datalist = await this._querylist();
        let html = this._createTable(datalist);
        res.render(html);
    }

    // 职位添加页码handlerbar渲染
    addRender(req, res) {
        let html = handlebar.compile(positionAddTpl)();
        res.render(html)
    }
    // 职位编辑页面handlebar渲染
    async editRender(req, res) {
        let rs = await get('/api/position/findone/' + req.params.id);
        let html = handlebar.compile(positionEditTpl)(rs.data);
        res.render(html);
        console.log(rs);
    }

    _initEvent() {
        let self = this;
        //获取main-container
        let $maincontainer = $('#main-container');

        // 职位信息添加点击事件
        $maincontainer.on('click', '#btn-add', () => router.go('/position/add'));

        // 职位信息添加确认事件
        $maincontainer.on('click', '#add-true', () => this._btnsubmit());

        // 职位信息添加界面取消事件
        $maincontainer.on('click', '#add-back', () => router.go('/position/index'));

        // 职位信息搜索点击事件
        $maincontainer.on('click', '#search-btn', () => this._search());

        // 职位信息删除点击事件
        $maincontainer.on('click', '#del-btn', function () {
            let id = $(this).attr('data-id');
            self._delbtn(id);
        })

        // 职位信息点击编辑事件
        $maincontainer.on('click', '#edit-btn', function () {
            let id = $(this).attr('data-id');
            router.go(`/position/edit/${id}`)
        })

        // 职位信息编辑取消点击事件
        $maincontainer.on('click', '#edit-back', () => router.go('/position/index'))

        // 职位信息编辑确认点击事件
        $maincontainer.on('click', '#edit-true', () => this._update());

        // 图片如果有问题，替换 ,图片路径有问题就用这个图片进行替换
        addEventListener('error', function (event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                event.target.src = '/static/404.jpg'
            }
        }, true);


        // 监听薪水输入框,只能输入数字
        $('#salary-num').on('input',function(){
            console.log($(this).val())
            if(/[^0-9]/.test($(this).val())){
                alert('请输入数字')
                $(this).val("0");
            }
        })
    }

    // 添加信息提交
    _btnsubmit() {
        $('#form-data-position').ajaxSubmit({
            success: (result) => {
                alert(result.message);
                if (result.code === 1) {
                    router.go('/position/index')
                }
            }
        })
    }


   

    // 职位信息搜索
    async _search() {
        this.keyword = $('#search-val').val();
        this.pageno = 1;
        let rs = await this._querylist();
        console.log(rs.data);
        let html = this._createTable(rs);
        console.log(html);
        this.res.render(html);
    }

    // 职位信息删除
    async _delbtn(id) {
        let rs = await get(`/api/position/remove/${id}`);
        alert(rs.message);
        if (rs.code === 1) {
            let datalist = await this._querylist();
            let html = this._createTable(datalist);
            this.res.render(html);
        }
    }
    // 职位信息更新
    async _update() {
        $('#form-data-positionupdate').ajaxSubmit({
            success: (result) => {
                alert(result.message);
                if (result.code === 1) {
                    router.go('/position/index')
                }
            }
        })
    }

    // get请求都走这个方法，
    _querylist() {
        let parmas = {
            keyword: this.keyword,
            pagesize: this.pagesize,
            pageno: this.pageno,
            sortname: this.sortname,
            sort: this.sort
        }
        return get('/api/position/all', parmas);
    }
    // 生成模板，利用handlebar渲染模板
    _createTable(alldata) {
        let parse = [];
        // 生成一个数组，用来生成页码
        let len = Math.ceil(alldata.total / this.pagesize);
        for (var i = 1; i <= len; i++) {
            parse.push(i);
        }
        // 重新设置数据
        let datalist = {
            list: alldata.data,
            parse,
            keyword: this.keyword,
            pageno: this.pageno,
            pagesize: this.pagesize,
            sortname: this.sortname,
            sort: this.sort
        }
        let html = handlebar.compile(positionTpl)(datalist);
        // 页码切换效果
        let timer = setTimeout(() => {
            $('.pagination').find('li[data-id="' + this.pageno + '"]').addClass('active').siblings().removeClass('active');
            clearTimeout(timer);
        }, 0)
        return html;
    }

}
export default new positionController();