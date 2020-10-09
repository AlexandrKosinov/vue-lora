import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        backendUrl: "http://127.0.0.1:1337/api/lora",   // "http://127.0.0.1:8000/lora"  "http://0.0.0.0:8000/lora"
        tokenUrl: "http://127.0.0.1:1337/api",          // "http://127.0.0.1:8000"  "http://0.0.0.0:8000"
        userId: 0,
        userName: 'guest',
        token: ''
    },
    mutations: {
        setToken(state, payload){
            state.token = payload
        },
        setUserName(state, payload){
            state.userName = payload
        },
        setUserId(state, payload){
            state.userId = payload
        },
    },
    actions: {},
    modules: {},
    getters: {
        getServerUrl: state => {
            return state.backendUrl
        },
        getUserId: state => {
            return state.userId
        },
        getUserName: state => {
            return state.userName
        },
        getTokenUrl: state => {
            return state.tokenUrl
        },
        getToken: state => {
            return state.token
        },
    }
})

export default store