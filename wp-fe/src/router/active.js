export default function Active(req){
    let url = req.route;
    console.log(url);
    let li = $('#menu-container li').find(`a[href="#${url}"]`).parent();
    console.log(li);
    li.addClass('active').siblings().removeClass('active');
}