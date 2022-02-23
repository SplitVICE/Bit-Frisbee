import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const _devMode = (() => {
  return process.env.VUE_APP_DEV_MODE && process.env.VUE_APP_DEV_MODE == "true"
    ? true : false;
})();

const _backendPort = "4000";

export default new Vuex.Store({
  state: {
    application_version: "v2.0.0",
    serverHost: {
      api_upload: (() => {
        return _devMode === true
          ? `http://localhost:${_backendPort}/api/upload`
          : '/api/upload'
      })(),
      api_files: (() => {
        return _devMode == true
          ? `http://localhost:${_backendPort}/api/files`
          : '/api/files'
      })()
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
