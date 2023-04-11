import vue from "vue";
import vuex from "vuex";
// 使用插件
vue.use(vuex);
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
// 对外暴露Store类的一个实例
export default new vuex.Store({
    // 注册小仓库
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})