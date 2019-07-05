<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home', params: { lang: locale } }"
        >Home</router-link
      >
      |
      <router-link :to="{ name: 'fblist', params: { lang: locale } }"
        >FbList</router-link
      >
      |
      <router-link :to="{ name: 'help', params: { lang: locale } }"
        >Help</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 10px;
  height: 60px;
  line-height: 40px;
  background: #fff;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
