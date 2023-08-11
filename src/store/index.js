import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const actions = {
  setOnlineUserNum(context, value) {
    context.commit('SET_ONLINE_MUM',value);
  },
};

const mutations = {
  SET_ONLINE_MUM(state, value) {
    state.onLineUserNum = value;
  },
};

const state = {
  onLineUserNum: 0,
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
