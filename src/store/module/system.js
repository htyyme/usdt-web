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
        gcointype:'usdt',
        banklist:[]
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
        },
        setGcointype(state,payload){
            state.gcointype = payload
        },
        setBanklist(state,payload){
            state.banklist = payload
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
                config.showUpi = true
            } else {
                config.showUpi = false
            }
            if (config.show_ifsc == '1'){
                config.showIfsc = true
            } else {
                config.showIfsc = false
            }
            //正式版就保留这一行代码，过审包注释掉下面的代码
            config.three_service_address = '1'

            commit('setConfig',config)
            return config
        },
        async loadBanners1({commit, state}, payload){
            const r = await request.post('/v1/banners',{type:1})
            let banners = r.data || []
            commit('setBanners1',r.data || [])
            return banners
        },
        async loadBankList({commit, state}, payload){
            const resp = await request.post('/v1/banks')
            const banklist = resp.data || []
            commit('setBanklist',banklist)
        }
    },
    getters: {
        locale: state => state.locale,
        config: state => state.config,
        gloading: state => state.gloading,
        contactInfo: state => state.contactInfo,
        banners1: state => state.banners1,
        tabbar: state => state.tabbar,
        gcointype: state => state.gcointype,
        banklist: state => state.banklist,

    },
}