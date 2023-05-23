<template>
  <div>
    <b-card class="custom-card" @keyup.esc="closeModal">
      <b-form-group label="Room To Join:">
        <b-form-input required type="text" v-model="username" />
      </b-form-group>

      <div class="d-flex justify-content-evenly">
        <div class="login-button mt-4">
          <b-button
            variant="secondary"
            class="mx-3"
            @click="addUserToList"
            type="submit"
            >Add</b-button
          >
        </div>
        <div class="login-button mt-4">
          <b-button
            variant="light"
            class="mx-3"
            @click="closeModal"
            type="submit"
            >Cancel</b-button
          >
        </div>
        <div class="mt-3" style="color: brown" v-if="errorMsg">
          {{ errorMsg }}
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import socket from "@/modules/socket.js";

export default Vue.extend({
  data() {
    return {
      username: "",
      errorMsg: "",
    };
  },
  components: {},
  methods: {
    closeModal() {
      this.$emit("close-addUser");
    },
    addUserToList() {
      socket.emit("joinRoom", this.username);
      this.$emit("create-addUser", this.username);
      this.$emit("close-addUser");
    },
  },
});
</script>
<style scoped>
.custom-card {
  display: inline-flex;
  width: 25%;
  min-width: 350px;
  border-radius: 15px;
  border: none;
  background: #282b30;
  color: #7aa6e9;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
}

.forgot-create-links a {
  text-decoration: none;
}
</style>
