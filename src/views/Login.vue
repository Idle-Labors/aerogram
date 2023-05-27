<template>
  <div id="app">
    <div class="img-bg">
      <component
        :is="renderLogin ? 'ChatLogin' : 'ChatSignup'"
        @render-signup="rendersSignup"
        @login-success="loginSuccess"
        @signup-success="rendersLogin"
        @signup-cancel="rendersLogin"
      />
    </div>
  </div>
</template>

<script>
import ChatLogin from "@/components/ChatLogin.vue";
import ChatSignup from "@/components/ChatSignup.vue";

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
    rendersSignup() {
      this.renderLogin = false;
    },
    rendersLogin() {
      this.renderLogin = true;
    },
    loginSuccess() {
      this.$router.push("/chat");
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  font-family: "Quicksand", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}

.img-bg {
  height: 100%;
  background-image: url(../assets/loginbg.webp);
  background-size: 120vh;
  background-repeat: round;
}
</style>
