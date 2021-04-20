import Vue from 'vue'
import VueRouter from 'vue-router'
import appConfig from "@/config";
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect:"/Home"
    },
    {
        path:"/Home",
        name:'Home',
        component:()=>import('@/views/Home/Home'),
        meta:{
            title:"Home",
            showTabbar:true
        },
        children:[
            {
                path:"",
                redirect:'OrderFinance'
            },
            {
                path:'OrderFinance',
                name:'OrderFinance',
                component:()=>import('@/views/Home/subpages/OrderFinance'),
                meta:{
                    title:"Order Finance",
                    showTabbar:true
                },
            }
        ]
    },
    {
        path:"/Order",
        name:'Order',
        component:()=>import('@/views/Order/Order'),
        meta:{
            title:"Order",
            showTabbar:true
        }
    },
    {
        path:"/Usdt",
        name:'Usdt',
        component:()=>import('@/views/Usdt/Usdt'),
        meta:{
            title:"Usdt",
            showTabbar:true
        }
    },
    {
        path:"/Team",
        name:'Team',
        component:()=>import('@/views/Team/Team'),
        meta:{
            title:"Team",
            showTabbar:true
        }
    },
    {
        path:"/Me",
        name:'Me',
        component:()=>import('@/views/Me/Me'),
        meta:{
            title:"Me",
            showTabbar:true
        }
    },
    {
        path:"/Login",
        name:'Login',
        component:()=>import('@/views/Login/Login'),
        meta:{
            title:"Login"
        }
    },
    {
        path:"/Register",
        name:'Register',
        component:()=>import('@/views/Register/Register'),
        meta:{
            title:"Register"
        }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach(((to, from, next) => {
    if (!checkAuth(to)) {
        return next({name: 'Login'})
    }
    setTitle(to)
    setTabbar(to)
    next()
}))

//设置页面的title
function setTitle(route) {
    if (route.meta.title) {
        document.title = route.meta.title + ' | ' + appConfig.appName
    } else {
        document.title = appConfig.appName
    }
}

//保存tabbar
function setTabbar(route) {
    const names = ['Home','Order','Team','Me','Usdt']
    // console.log('-------',route)

    if (route.matched[0] && names.indexOf(route.matched[0].name) !== -1) {
        store.commit('system/setTabbar', route.matched[0].name)
    }
}

//检查权限
function checkAuth(route){
    const arr = [
        'Register',
        'Login',
        'ForgetPassword'
    ]
    const routeName = route.name
    if (arr.includes(routeName)) {
        return true
    }
    const token = store.getters['user/token']
    return !!token
}

export default router
