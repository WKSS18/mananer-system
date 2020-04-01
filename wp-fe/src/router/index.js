import SMERouter from 'sme-router'
import active from './active';
import position from '../controller/positionController'
const router = new SMERouter('main-container');

router.use(active);

router.route('/index',(req,res)=>{
    res.render('<img src="../static/libs/bg.png" style="width:100%;height:620px">');
})

router.route('/position/index',position.render.bind(position))

router.route('/position/add',position.addRender.bind(position));

router.route('/position/edit/:id',position.editRender)

router.route('*',(req,res)=>{
    res.redirect('/index')
})
 
export default router;