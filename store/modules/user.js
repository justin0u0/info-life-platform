
import { login } from '@/api/session';
import { getUser } from '@/api/user';

const user = {
  state: {
    id: null,
    username: null,
    data: {},
    isLoggedIn: false,
  },
  mutations: {
    SET_LOGIN_STATE: (state, currentUser) => {
      state.id = currentUser._id;
      state.username = currentUser.username;
      state.data = currentUser;
      state.isLoggedIn = true;
    },
    SET_LOGOUT_STATE: (state) => {
      state.id = null;
      state.username = null;
      state.data = {};
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      const loginProcess = async() => {
        const { token } = await login(username, password);
        window.localStorage.setItem('auth_token', token);
        const currentUser = await getUser();
        commit('SET_LOGIN_STATE', currentUser);
        console.log('[Vuex:login]: Login successfully');
      };
      return loginProcess();
    },
    logout({ commit }) {
      const logoutProcess = async() => {
        window.localStorage.removeItem('auth_token');
        commit('SET_LOGOUT_STATE');
        console.log('[Vuex:logout]: Logout successfully');
      };
      return logoutProcess();
    },
  },
};

export default user;
