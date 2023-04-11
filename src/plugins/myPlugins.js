// Vue插件一定暴露一个对象
let myPlugins = {};
myPlugins.install = function(Vue,options){
    // Vue.prototype.$bus
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
    })
}
export default myPlugins