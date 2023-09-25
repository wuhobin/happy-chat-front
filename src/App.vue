<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import { removeToken, removeUser } from "@/utils/auth";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Home,
  },
  mounted() {
    this.$ws.on((e) => {
      const { type, value } = JSON.parse(e.data);
      console.log(JSON.parse(e.data));
      switch (type) {
        case "message": {
          this.onMessage(value);
          break;
        }
        case "open": {
          this.dealTasks();
          break;
        }
        case "close":
        case "error": {
          this.onClose();
          break;
        }
      }
    });
  },
  methods: {
    onMessage(value) {
      const { type, data } = JSON.parse(value);
      console.log("websocket收到后端消息 type", type);
      console.log("websocket收到后端消息 data", data);
      switch (type) {
        case 5: {
          // 用户上线
          this.$store.commit("SET_ONLINE_MUM", data.onlineNum);
          this.$store.commit("INCR_ONLINE_MEMBER", data.changeList[0]); 
          break;
        }
        case 6: {
          //让前端token失效
          removeToken();
          removeUser();
          break;
        }
        default: {
          console.log("接收到未处理类型的消息:", value);
          break;
        }
      }
    },
    dealTasks() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$ws.send({ type: 3, data: { token } });
      }
      this.getOnlineList();
    },
    getOnlineList() {
      this.$http.UserOnlineList().then((res) => {
        const { data, code } = res;
        console.log(res);
        if (code === 200) {
          this.$store.commit("SET_ONLINE_MUM", data.onlineCount);
          this.$store.commit("SET_ONLINE_MEMBER_LIST", data.onlineList);
        }
      });
    },
    onClose() {},
  },
};
</script>

<style scoped lang="less">
#app {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/images/bg.jpg") no-repeat center;
  background-size: 300% 300%;
  animation: gradientBG 100s ease infinite;
  overflow: hidden;
}
</style>
