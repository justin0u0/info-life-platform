
import { login } from '@/api/session';
import { getUser } from '@/api/user';

const user = {
  state: {
    id: null,
    username: null,
    data: null,
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
      state.data = null;
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
  },
};

export default user;
