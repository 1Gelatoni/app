// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import routes from './routes'
// 引入store
import store from '@/store'
// 先保存VueRouter原型对象的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push和replace方法
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些方法）
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject) //确保push方法的上下文为VueRouter的一个实例
    }else{
        originPush.call(this,location,()=>{},()=>{})  //手动传入两个回调
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject) //确保push方法的上下文为VueRouter的一个实例
    }else{
        originReplace.call(this,location,()=>{},()=>{})  //手动传入两个回调
    }
}
// /配置路由
let router = new VueRouter({
    // 配置路由
    routes, // K-V一致 省略V
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // 返回y为0 代表滚动条默认在顶部位置
        return {y:0}
      }
      
})
// 全局守卫：前置守卫：在路由跳转前判断
router.beforeEach(async (to,from,next)=>{
    // to:跳转到的路由
    // from：从哪个路由而来
    // next：放行函数  next()放行  next(路径)放行到指定路由  next(false)中断当前导航，如果浏览器url改变，重置到from路由
    // next()
    // 用户登录了才会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    if(token){
        // 用户已经登录 不能再去login界面
        if(to.path == '/login' || to.path=='/register'){
            next('/')
        }else{
            // next()
            // 如果有用户名 则放行
            if(name){
                next()
            }else{
                // 登录了 但没有用户信息
                try {
                    // 没有用户信息 派发action
                    await store.dispatch('getUserInfo')
                    // 获取用户信息成功 放行
                    next()
                } catch (error) {
                    // token失效 获取不到用户信息 重新登陆
                    // 清除用户信息
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录不能去交易相关、支付相关【pay paysuccess】、个人中心【center】
        let toPath = to.path
        console.log(toPath);
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            // 把未登录时想去但没有去成的path 存储于路由当中
            next('/login?redriect='+toPath)
        }else{
            next()
        }
    }
})
export default router