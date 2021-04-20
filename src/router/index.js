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
    const names = ['Home','Order','Team','Me','UsdtTrading']
    // console.log('-------',route)

    if (route.matched[0] && names.indexOf(route.matched[0].name) !== -1) {
        store.commit('system/setTabbar', route.matched[0].name)
    }
}

export default router
