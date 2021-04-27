export default {
    namespaced: true,
    state: {
        currentshopinfo: {}
    },
    mutations: {
        setCurrentshopinfo(state, payload) {
            state.currentshopinfo = payload
        }
    },
    getters: {
        currentshopinfo: state => state.currentshopinfo,
    }
}