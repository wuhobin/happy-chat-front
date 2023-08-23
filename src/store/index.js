import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const actions = {
  setOnlineUserNum(context, value) {
    context.commit("SET_ONLINE_MUM", value);
  },
};

const mutations = {
  //设置用户在线数量
  SET_ONLINE_MUM(state, value) {
    state.onLineUserNum = value;
  },
  //设置在线用户列表
  SET_ONLINE_MEMBER_LIST(state, value) {
    state.onLineMemberList = value;
  },
  //增加在线用户
  INCR_ONLINE_MEMBER(state, value) {
    if (!state.onLineMemberList.some((item) => item.id === value.id)) {
      state.onLineMemberList.unshift(value);
    }
  },
  //减少在线用户
  DECR_ONLINE_MEMBER(state, value) {},
  
  // 设置组件RoomList 展示类型
  SET_MIDDLE_LIST_TYPE(state, value) {
    state.middleMsgType = value
  },
};

const state = {
  onLineUserNum: 0,
  onLineMemberList: [],
  // 组件RoomList 展示类型 1是聊天 2是联系人 默认是1
  middleMsgType: 1
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
