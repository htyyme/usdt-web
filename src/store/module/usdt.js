export default {
    namespaced: true,
    state: {
        currentshopinfo: {},
        currentnews:{}
    },
    mutations: {
        setCurrentshopinfo(state, payload) {
            state.currentshopinfo = payload
        },
        setCurrentnews(state,payload){
            state.currentnews = payload
        }
    },
    getters: {
        currentshopinfo: state => state.currentshopinfo,
        currentnews: state => state.currentnews,
    }
}