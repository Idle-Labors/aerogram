<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import ChatLogin from "@/components/ChatLogin.vue";
import ChatSignup from "@/components/ChatSignup.vue";

export default {
  name: "App",
  components: {
    ChatLogin,
    ChatSignup,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");

#app {
  font-family: "Quicksand", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  font-family: "Quicksand", sans-serif;
}
</style>
