import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList ({commit}){
        let result = await reqCartList()
        // console.log(result);
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车产品
    async deleteCartById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车中某个产品的状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch,getters}){
        // context 小仓库 commit【提交mutation修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        // console.log(context);
        // console.log(getters);
        // 获取购物车中全部产品（数组）
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartById',item.skuId):''  //返回deleteCartById的返回值 Promise
            // 将每一次返回的promise 添加到数组中
            promiseAll.push(promise)
        });
        // 全部成功 才返回成功
        return Promise.all(promiseAll)
    },
    // 全选按钮
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}