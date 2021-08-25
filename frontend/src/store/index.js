import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const dev_mode = false;

export default new Vuex.Store({
  state: {
    application_version: "v1.4.0",
    serverHost: {
      api_upload: (() => { return dev_mode == true ? 'http://localhost:4000/api/upload' : '/api/upload' })(),
      api_files: (() => { return dev_mode == true ? 'http://localhost:4000/api/files' : '/api/files' })()
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
