<template>
  <div>
    <b-card class="custom-card" @keyup.esc="closeModal">
      <b-form-group label="Enter Channel Name:">
        <b-form-input required type="text" v-model="channel" />
      </b-form-group>

      <div class="d-flex justify-content-evenly">
        <div class="login-button mt-4">
          <b-button
            variant="secondary"
            class="mx-3"
            @click="addChannelToList"
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
import { user } from "../router/api";
import socket from "@/modules/socket.js";

export default Vue.extend({
  data() {
    return {
      channel: "",
      errorMsg: "",
    };
  },
  components: {},
  methods: {
    closeModal() {
      this.$emit("close-addChannel");
      console.log("emit close");
    },
    addChannelToList() {
      console.log(this.channel);
      socket.emit("createRoom", this.channel);
      this.$emit("create-newChannel", this.channel);
      this.$emit("close-addChannel");
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
