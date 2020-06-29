
const app = {
  state: {
    isProcessing: false,
    processTitle: '',
  },
  mutations: {
    SET_IS_PROCESSING: (state, isProcessing) => {
      state.isProcessing = isProcessing;
    },
    SET_PROCESS_TITLE: (state, processTitle) => {
      state.processTitle = processTitle;
    },
  },
  actions: {
    setIsProcessing({ commit }, isProcessing) {
      commit('SET_IS_PROCESSING', isProcessing);
    },
  },
};

export default app;
