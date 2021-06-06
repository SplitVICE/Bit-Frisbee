import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Server host without "_" will be used in frontend project application
    serverHost: // To use when this frontend project has been built on backend project (production)
    {
      api_upload: '/api/upload',
      api_files: '/api/files',
      api_uploaded_files_retrieve: '/api/files/uploaded',
    },
    _serverHost: // To test this frontend project
    {
      api_upload: 'http://localhost:4000/api/upload',
      api_files: 'http://localhost:4000/api/files',
      api_uploaded_files_retrieve: 'http://localhost:4000/api/files/uploaded',
    },
    application_version: "v1.0.1",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
