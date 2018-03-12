
/*
    requireJs 注意事项
    ----  如果页面没有使用 data-main  或者require.config没有配置 baseUrl  -----
    1. paths中定义的路径：不是本js文件与它的相对路径，而是引用本js文件的html与它的相对路径

    ---   当页面使用了 data-main 或者require.config配置了 baseURL
    1.  paths中定义的路径，将是相对于 data-maim或者相 baseUrl的相对路径

    2. paths中的路径不加后缀
    3. html页面只要 引用require就行，不需要再次引用jquery。 require本身就是用来加载jquery的
    4. shim定义的是不符合AMD规范的 机不标准的js模块
*/

/*
   avalon 注意事项
   1. requireJs加载avalonJs,avalon，必须禁用自带的adm加载模块，发放：修改avalon.config中的loader为false
   2. 单项绑定 {{::model.name}}
   3. ms-controller,
      ms-important, 次作用于中 绑定模型找不到，禁止父级作用于查找
      ms-skip ：次作用域 不加载，跳过
   4. 扫描机制： 如果我们在input下添加了div提示，并且在div内又加入了avalon指令，此时需要手动调用scan
                注意： 所有指令都在本次扫描后被移除，所以只能使用一次扫描
      <script>
            avalon.ready(function () {
                var div = document.createElement("div")
                div.innerHTML = "{{aaa}}"
                div.setAttribute("ms-controller", "eee")
                document.body.appendChild(div)
                var vm = avalon.define({
                    $id: "eee",
                    aaa: 111
                })
                avalon.scan(div, vm)
            })
        </script>

    5. 表单元素 特殊绑定：ms-duplex

*/

require.config({
    baseUrl:"../js",
    paths:{
        "jquery":["jquery-3.3.1"],
        "avalon":["avalon"],
        "mmHistory":["mmHistory"],
        "mmRouter":["mmRouter"]
    },
    shim:{
        avalon:{exports:"avalon"},
        mmHistory:{deps:["avalon"]},
        mmRouter:{deps:["avalon"]}
    }
})


require(["jquery","avalon","mmHistory","mmRouter"],function($,avalon,mmHistory,mmRouter){
    var model = avalon.define({
        $id:"mainCtrl",
        name:"your mama",
        old:38,
        id:10,
        textCb:"你妈妈",
        radioCb:"shit",
        currentHtml:"my.html"
    })

    function callback(){
        if(this.path=="/"){
            model.currentHtml="my.html"
        }else{
            var path_tail = this.path.replace(/\//, "");
            model.currentHtml = path_tail + ".html";  //动态修改pageUrl属性值
        }
    }

    //执行路由跳转
    avalon.router.get("/*path", callback); //劫持url hash并触发回调
    avalon.history.start(); //历史记录堆栈管理
    avalon.scan();  //重新设置绑定  不能删除

    $(function () {
        // alert("whos your daddy");
        model.id=1;
    })



})