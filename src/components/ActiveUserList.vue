<template>
  <div>
    <div class="mb-3">
      <p
        v-b-toggle.collapse-active
        class="h5 text-color mb-2 sidebar-item text-color flex-row"
      >
        <b-icon icon="person-lines-fill"></b-icon>
        Active Users
      </p>
      <b-collapse id="collapse-active" visible class="mb-2">
        <div v-for="user in activeUsers" :key="user">
          <p class="smaller-text sidebar-item text-color">
            {{ user }}
          </p>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import socket from "@/modules/socket.js";

export default Vue.extend({
  data() {
    return {
      activeUsers: [],
    };
  },
  created() {
    socket.on("userList", (users) => {
      this.activeUsers = [];
      this.activeUsers = users;
    });
  },
  methods: {},
});
</script>
