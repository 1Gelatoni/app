// 路由配置信息
// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail';
import AddCartSyccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path:"/home",
        // 路由懒加载 访问组件时才引用
        component:()=>import('@/pages/Home'),
        // 路由元信息
        meta:{isShow:true}
    },
    {
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta:{isShow:true},
        name:'search',
        // 路由组件传递props参数
        // 1、布尔值（params参数）
        // props:true
        // 2、对象写法 额外给路由组件传递一些props
        // props:{a:1,b:2}
        // 3、函数写法：可以把params参数、query参数通过props传递给路由组件
        // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {
        path:"/login",
        component:Login,
        meta:{isShow:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{isShow:false}
    },
    // 重定向：在项目跑起来时，访问/时 让他立马定位到首页
    {
        path:'*',
        redirect:'/home'
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{isShow:true}
    },
    // 加入购物车成功
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSyccess,
        meta:{isShow:true}
    },
    // 购物车
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        meta:{isShow:true}
    },
    // 结算页面
    {
        path:'/trade',
        name:'trade',
        component:Trade,
        beforeEnter: (to, from, next) => {
            // 只有从购物车才能跳转到交易页面
            if (from.path == '/shopcart') {
                next()
            }else{
                // 其他路由组件 停留在当前
                next(false)
            }
        },
        meta:{isShow:true}
    },
    // 支付
    {
        path:'/pay',
        name:'pay',
        component:Pay,
        beforeEnter: (to, from, next) => {
            // 只有从交易页面才能跳转到支付页面
            if (from.path == '/trade') {
                next()
            }else{
                // 其他路由组件 停留在当前
                next(false)
            }
        },
        meta:{isShow:true}
    },
    // 支付成功
    {
        path:'/paysuccess',
        name:'paysuccess',
        component:PaySuccess,
        /* beforeEnter: (to, from, next) => {
            // 只有从支付页面才能跳转到支付成功页面
            if (from.path == '/pay') {
                next()
            }else{
                // 其他路由组件 停留在当前
                next(false)
            }
        }, */
        meta:{isShow:true}
    },
    // 个人中心
    {
        path:'/center',
        name:'center',
        component:Center,
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ],
        meta:{isShow:true}
    },
]