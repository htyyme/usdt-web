import Vue from 'vue'
import VueRouter from 'vue-router'
import appConfig from "@/config";

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
    setTitle(to)
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

export default router
