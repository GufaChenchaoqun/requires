
var vm=avalon.define({
    $id:"test",
    a:1,
    $b:2,
    $skipArray:["a"],
    c:3
})
setTimeout(function () {
    vm.a=100
    vm.b=200
},3000)