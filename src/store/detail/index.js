import {reqGoodsInfo} from '@/api'
import {reqAddOrUpdateShopCart} from '@/api'
// 封装临时游客身份 uuid-->生成随机字符串（不能变）
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        // console.log(result.data);
        if(result.code == 200){
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 将参数带给服务器 服务器写入数据成功 返回code为200 代表当前数据存储成功 没有返回其他数据不用三连环
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前函数执行返回Promise（因为async）
        if(result.code == 200){
            return "ok" //返回非空字符串代表成功
        }else{
            return Promise.reject(new Error('fail'))  //代表失败
        }
    }
}
const getters = {
    // 简化导航数据
    categoryView(state){
        // 计算出的属性至少为空对象 不会出现假报错
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 简化产品售卖信息
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}