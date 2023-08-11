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
      console.log(e.data);
      const { type, value } = JSON.parse(e.data);
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
      console.log("websocket收到后端消息", value);
      const { type, data } = JSON.parse(value);
      switch (type) {
        case 6: {
          //让前端token失效
          removeToken()
          removeUser()
          break;
        }
        default: {
          console.log("接收到未处理类型的消息:", params);
          break;
        }
      }
    },
    dealTasks() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$ws.send({ type: 3, data: { token } });
      }
    },
    onClose() {},
  },
};
</script>

<style scoped lang="less">
#app {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/bg.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>
