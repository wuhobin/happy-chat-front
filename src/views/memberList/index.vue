<template>
  <div class="box-wrap">
    <div class="top-tip">
      <p>在线用户:</p>
      <span>{{ onLineUserNum }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MemberList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["onLineUserNum"]),
  },
  created() {
    this.$http.UserOnlineList().then((res) => {
      const { data, code } = res;
      console.log(res);
      if (code === 200) {
        this.$store.commit('SET_ONLINE_MUM', data.onlineCount);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.box-wrap {
  .top-tip {
    display: flex;
    font-size: 15px;
    font-weight: 400;

    span {
      margin-left: 20px;
    }
  }
}
</style>
