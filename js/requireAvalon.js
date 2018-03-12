
require.config({
    baseUrl:"../js",
    paths:{
        "avalon":["avalon"]  // 必须修改源码，禁用adm加载器（搜索avalon.config,吧loader值从true改为false即可）
    }
})
require(["avalon"],function (avalon) {
    avalon.define({
        $id:"test",
        name:"your mama",
        id:23,
        old:38,
        textCb:"你妈妈",
        radioCb:"shit"
})

})