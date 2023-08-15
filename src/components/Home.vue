<template>
  <main class="home">
    <div class="wrapper">
      <ToolBar></ToolBar>
      <RoomList></RoomList>
      <div class="router-view-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <footer class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener"
        >闽ICP备2023004110号</a
      >
    </footer>
  </main>
</template>

<script>
import ToolBar from "@/components/toolbar/index.vue";
import RoomList from "@/components/RoomList/index.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    ToolBar,
    RoomList,
  },
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100vw;
    height: 100%;
    height: 100dvh;
    border-radius: 10px;
    background-color: var(--white);

    .router-view-wrapper {
      width: calc(100% - 360px);
      padding: 20px 20px 20px 0;
      box-sizing: border-box;
    }
  }

  @media only screen and (min-width: 640px) {
    .wrapper {
      position: relative;
      flex-direction: row;
      width: 65vw;
      height: 80vh;
      margin: 0 auto;
      margin-top: 10vh;
      background-color: var(--white);
      border-radius: 10px;
    }
  }
  .footer {
    margin-top: 7vh;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}
</style>
