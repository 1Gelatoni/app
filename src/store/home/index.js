// home模块的小仓库
import { reqCategoryList, reqGetBannerList , reqFloorList} from "@/api";
const state = {
    // state中数据的初始值应与服务器返回值类型一致
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    // 通过API中的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList(); //await获取请求成功的数据 与async搭配
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    },
    // floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    }
};
// 计算属性
const getters = {};
export default {
    // namespaced:true,//命名空间
    state,
    mutations,
    actions,
    getters
}