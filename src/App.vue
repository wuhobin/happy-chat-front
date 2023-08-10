<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>

import Home from './components/Home.vue';

export default {
  name: "App",
  components:{
    Home
  }
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
