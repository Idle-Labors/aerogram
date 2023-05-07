<template>
  <div>
    <div class="mb-3">
      <p
        v-b-toggle.collapse-dm
        class="h5 text-color mb-2 sidebar-item text-color flex-row"
      >
        <b-icon icon="chat-text-fill"></b-icon>
        Direct Messages
      </p>
      <b-collapse id="collapse-dm" visible class="mb-2">
        <div v-for="user in users" :key="user" @click="joinChannel(user)">
          <p class="smaller-text sidebar-item text-color">
            <b-icon icon="hash"></b-icon> {{ user }}
          </p>
        </div>
        <p class="smaller-text sidebar-item text-color">
          <b-icon icon="circle-fill" variant="danger"></b-icon>
          Username
        </p>
        <p class="smaller-text sidebar-item text-color">
          <b-icon icon="circle-fill" variant="success"></b-icon>
          Another Username
        </p>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import socket from "@/modules/socket.js";

export default Vue.extend({
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    joinChannel(user) {
      socket.emit("join", user);
      console.log("joined");
    },
  },
});
</script>
<style>
.sidebar-item:hover {
  background-color: rgba(90, 125, 115, 0.521);
  border-radius: 10px;
  size: 100%;
}
.smaller-text {
  font-size: 0.9rem;
}
</style>
