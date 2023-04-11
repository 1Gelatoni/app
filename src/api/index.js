// 对所有的接口进行统一管理
import requests from "./request";
import mockRequest from './mockRequest'
// 三级联动接口
/*
    http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList 
    GET请求 无参数
 */
export const reqCategoryList = ()=>{
    // 发请求:axios发请求返回Promise对象
    return requests({url:'/product/getBaseCategoryList ',method:'get'})
}
// 获取首页轮播图
export const reqGetBannerList = ()=>{
    return mockRequest({url:'/banner',method:'get'})
}  
// 获取floor数据
export const reqFloorList = ()=>mockRequest.get('/floor')
// 获取搜索模块数据 /api/list 请求方式：POST 带参数请求
// 这个接口给服务器传递一个默认参数 至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})
// 获取产品详情信息    /api/item/{skuId}  请求方式:get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})
// 将产品加入购物车（或更新产品个数） /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车列表  /api/cart/cartList get
export const reqCartList = () => requests({url:'/cart/cartList',methods:'get'})
// 删除购物车中的产品 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 修改产品选中状态 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckedById = (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 用户注册 /api/user/passport/register post
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})
// 登录 /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息【需要带着用户的token】 /user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录 /user/passport/logout 
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})
// 获取用户信息接口 /user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取商品清单 /order/auth/trade get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})
// 提交订单 /order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data)=> requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取支付信息 /payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付订单状态 /payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取我的订单列表 /order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})


