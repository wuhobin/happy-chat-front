<template>
  <div id="app">
    <router-view />
    

  </div>
</template>

<script>
export default {
  name: "App"
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
