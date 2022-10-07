<template>
  <nav-bar />
  <router-view />
</template>

<script>
import NavBar from '/@components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },

  };

</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
}
</style>
