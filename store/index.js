import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    app,
  },
  getters: {
    isProcessing: (state) => state.app.isProcessing,
    processTitle: (state) => state.app.processTitle,
  },
});

export default store;
