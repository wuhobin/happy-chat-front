<template>
  <div id="app">
    <header-nav/>
    <router-view />
  </div>
</template>

<script>
import HeaderNav from './components/nav/HeaderNav.vue'

export default {
  name: 'App',
  components:{
    HeaderNav
  }
}
</script>

<style></style>
