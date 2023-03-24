<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatLogin from "../components/ChatLogin.vue"

export default Vue.extend({
  name: "Login",
  components: {
    ChatLogin,
  },
});
</script>
