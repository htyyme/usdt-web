import axios from "axios";
import appConfig from "@/config";
import store from '@/store'
import messages from "@/assets/lang/messages";
import {getLangField} from "@/utils/tools";
import {encryptBy3DES,decryptBy3DES,encryptReqData,decryptResData} from "@/utils/encrypt";

import {Toast} from "vant";
import router from "@/router";

let responseId = 0
let requestId = new Date().getTime()
const service = axios.create({
    baseURL: appConfig.baseApiUrl,
    timeout: 15000
})

//请求拦截
service.interceptors.request.use(config => {
    // console.log('request',config)
    //开启loading状态
    Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
    });

    store.commit('system/setGloading', true)
    if (requestId !== responseId) { //上一个请求已响应
        let now = new Date().getTime()
        requestId = now
        responseId = now
        config.headers.requestId = requestId
    } else { //上一个请求未响应
        config.headers.requestId = requestId
    }

    config.headers.token = store.getters['user/token']

    if (appConfig.env === 'prod' && !config.url.startsWith('/api')) {
        config.data = encryptReqData(config.data)
    }
    return config
})

//响应拦截
service.interceptors.response.use(resp => {
    // console.log('resp',resp)
    Toast.clear()
    setTimeout(() => store.commit('system/setGloading', false), 500)

    if (resp.status === 503){
        Toast.fail(getLangField('netbusy'))
    }

    // 更新响应id，
    responseId = new Date().getTime()

    let respData = resp.data

    if (appConfig.env === 'prod' && !resp.config.url.startsWith('/api')){
        respData = decryptResData(resp.data)
    }

    // console.log(resp.config.url,respData)
    const {code, message} = respData
    if (code === 403){
        Toast.fail(message)
        store.commit('user/setToken','')
        router.replace({name:'Login'})
        return Promise.reject(respData)
    }else if (code !== 200){
        Toast.fail(message)
        return Promise.reject(respData)
    }
    return respData
}, error => {
    Toast.clear()
    setTimeout(() => store.commit('system/setGloading', false), 500)
    return Promise.reject(error)
})




export default service
