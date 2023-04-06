<template>
  <div id="app">
    <div class="img-placeholder"></div>
    <component
      :is="renderLogin ? 'ChatLogin' : 'ChatSignup'"
      @render-signup="renderSignup"
    />
  </div>
</template>

<script lang="ts">
import ChatLogin from "../components/ChatLogin.vue";
import ChatSignup from "../components/ChatSignup.vue";

export default {
  data() {
    return {
      renderLogin: true,
    };
  },
  name: "login",
  components: {
    ChatLogin,
    ChatSignup,
  },
  methods: {
    renderSignup() {
      this.renderLogin = false;
    },
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
