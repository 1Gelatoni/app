// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
// nprogress start方法：进度条开始；done方法：进度条结束
// 1.利用axios对象方法create 创建一个axios实例
// 2.requests就是axios 不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径当中会出现/api
    baseURL:"/mock",
    // 代表请求超时的时间(若请求在5s内无响应则请求失败)
    timeout:5000
});
// 请求拦截器：在发请求之前，请求拦截器可以监测到
// config是一个配置对象
requests.interceptors.request.use((config)=>{
    // config配置对象中的headers请求头属性很重要
    // 进度条开始
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器响应数据回来以后，相应拦截器可以检测到
    // 进度条结束
    nprogress.done();
    return res.data
},(error)=>{
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))  //终止promise链
})


// 对外暴露
export default requests