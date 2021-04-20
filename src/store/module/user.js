import request from "@/utils/request";
export default {
    namespaced: true,
    state: {
        token: '',
        userInfo:{},
        usdtAccount:{},
        coinAccount:{},
    },
    mutations: {
        setToken(state,payload){
            state.token = payload
        },
        setUserInfo(state,payload){
            state.userInfo = payload
        },
        setUsdtAccount(state,payload){
            state.usdtAccount = payload
        },
        setCoinAccount(state,payload){
            state.coinAccount = payload
        },
    },
    actions: {
        async loadUserInfo({commit, state},payload){
            const r = await request.post('/v1/auth/user')
            const userinfo = r.data
            userinfo.extend_info = userinfo.extend_info ? JSON.parse(userinfo.extend_info) : {}
            commit('setUserInfo',userinfo)

            if (userinfo.accounts && userinfo.accounts.length === 2){
                for (let i = 0; i < userinfo.accounts.length; i++) {
                    let item = userinfo.accounts[i]
                    if (item.coin_type === 1){
                        commit('setCoinAccount',item)
                    }else if (item.coin_type === 2){
                        commit('setUsdtAccount',item)
                    }
                }
            }
            return userinfo
        },
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo,
        usdtAccount: state => state.usdtAccount,
        coinAccount: state => state.coinAccount,
    }
}