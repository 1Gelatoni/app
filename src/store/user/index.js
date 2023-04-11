import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state={
    code:'',
    token:getToken(),
    userInfo:{}

}
const mutations={
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清除数据
    CLEAR(state){
        // 仓库数据清空
        state.token = ''
        state.userInfo = {}
        // 本地存储情况
        removeToken()
    }
}
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个接口 返回的是验证码 正常情况是后台将验证码发送到手机
        let result = await reqGetCode(phone)
        if (result.code==200) {
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 登陆业务【token：令牌】
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            // 本地存储token
            // localStorage.setItem("TOKEN",result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 清除服务器token
        let result = await reqLogout()
        if(result.code == 200){
            // action中不能操作state
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }

}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}