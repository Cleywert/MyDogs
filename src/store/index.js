import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dogs: [],
        items: [],
        breeds: [],
        subbreeds: [],
        favorites: [],
        subbreed: "",
        breedGlobal: "akita",
        subbreedGlobal: "",
    },
    mutations: {
        SET_DOGS(state,payload){
            state.dogs = payload;
        },
        SET_BREED(state, payload){
            state.breedGlobal = payload
        },
        SET_BREEDS(state, payload) {
            state.breeds = payload
        },
        SET_SUBBREED(state, payload){
            state.subbreedGlobal = payload
        },
        SET_SUBBREEDS(state, payload) {
            state.subbreeds = payload
        },
        SET_FAVORITES(state, payload) {
            state.favorites = payload;
        },
    },
    actions: {

    },
    modules: {
    }
})
