import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    app,
    user,
  },
  getters: {
    isProcessing: (state) => state.app.isProcessing,
    processTitle: (state) => state.app.processTitle,
    currentUserId: (state) => state.user.id,
    isLoggedIn: (state) => state.user.isLoggedIn,
  },
});

export default store;
