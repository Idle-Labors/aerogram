<template>
  <div id="app">
    <div class="img-placeholder"></div>
    <ChatSignup />
  </div>
</template>

<script lang="ts">
import ChatLogin from "../components/ChatLogin.vue";
import ChatSignup from "../components/ChatSignup.vue";

export default {
  name: "App",
  components: {
    ChatLogin,
    ChatSignup,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.img-placeholder {
  background-image: url(../assets/login2.png);
  height: 12rem;
}
</style>
