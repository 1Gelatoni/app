import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList:{}
};
const mutations = {
    GETSEARCHINFO(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块数据
    async getSearchInfo({commit},params={}){ //params={} 默认参数 没传参的话则为空对象
        // reqGetSearchInfo获取服务器对象时至少传递一个参数
        // params形参 是当用户派发actin时 第二个参数传递的 至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHINFO',result.data)
        }
    }
};
// 计算属性 在项目中是为了简化仓库中的数据
const getters = {
    // state：当前仓库（search）的state
    goodsList(state){
        // 假如网络不给力或是没有网 state.searchList.goodsList返回的是undefined 加空数组以防万一
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
};
export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
}