export default {
    namespaced: true,
    state:{
        currentmsg:{}
    },
    mutations:{
        setCurrentmsg(state,payload){
            state.currentmsg = payload
        }
    },
    getters:{
        currentmsg:state=>state.currentmsg
    }
}