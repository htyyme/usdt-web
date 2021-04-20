import request from "@/utils/request";

export default {
    namespaced: true,
    state: {
        tabbar: 'Home',
        locale: '',
        gloading:false,
        config: {},
        contactInfo:{},
        banners1:[],
    },
    mutations: {
        setLocale(state, payload) {
            state.locale = payload
        },
        setConfig(state, payload) {
            state.config = payload
        },
        setGloading(state,payload){
            state.gloading = payload
        },
        setContactInfo(state,payload){
            state.contactInfo = payload
        },
        setBanners1(state,payload){
            state.banners1 = payload
        },
        setTabbar(state,payload){
            state.tabbar = payload
        }
    },
    actions: {
        async loadConfig({commit, state}, payload) {
            const r = await request.post('/v1/config')
            let config = r.data
            if (!config.banners) {
                config.banners = []
            }else{
                config.banners = JSON.parse(config.banners)
            }

            if (!config.pay_info){
                config.pay_info = {}
            }else{
                config.pay_info =  JSON.parse(config.pay_info)
            }

            if (!config.socker_lock){
                config.socker_lock = []
            } else {
                config.socker_lock = JSON.parse(config.socker_lock)
            }

            if (config.note_api == '0'){
                config.isSendSms = false
            }else{
                config.isSendSms = true
            }

            if (config.show_upi_ifsc == '1'){
                config.show_upi_ifsc = true
            } else {
                config.show_upi_ifsc = false
            }
            commit('setConfig',config)
            return config
        },
        async loadBanners1({commit, state}, payload){
            const r = await request.post('/v1/banners',{type:1})
            let banners = r.data || []
            commit('setBanners1',r.data || [])
            return banners
        }
    },
    getters: {
        locale: state => state.locale,
        config: state => state.config,
        gloading: state => state.gloading,
        contactInfo: state => state.contactInfo,
        banners1: state => state.banners1,
        tabbar: state => state.tabbar,

    },
}