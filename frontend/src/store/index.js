import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const _devMode = process.env.VUE_APP_DEV_MODE && process.env.VUE_APP_DEV_MODE == "true" ? true : false;
const _backendPort = "4000";

export default new Vuex.Store({
  state: {
    application_version: "v2.0.0",
    serverHost: _devMode == true ? `http://localhost:${_backendPort}` : '',
    fileSizeLimit: { bytes: 0, readable: "" }
  },
  mutations: {
    UpdateFileSizeLimit(state, payload) { state.fileSizeLimit = payload; }
  },
  actions: {
    UpdateFileSizeLimit({ commit }, payload) { commit('UpdateFileSizeLimit', payload); }
  },
  modules: {
  }
})
