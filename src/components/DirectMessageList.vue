<template>
  <div>
    <div class="mb-3">
      <p
        v-b-toggle.collapse-dm
        class="h5 text-color mb-2 sidebar-item text-color flex-row"
      >
        <b-icon icon="chat-text-fill"></b-icon>
        Private Channels
      </p>
      <b-collapse id="collapse-dm" visible class="mb-2">
        <div v-for="user in users" :key="user" @click="joinChannel(user)">
          <p
            class="smaller-text sidebar-item text-color"
            :class="{ active: isActive === user }"
          >
            <b-icon icon="hash"></b-icon> {{ user }}
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
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isActive: null,
    };
  },
  components: {},
  methods: {
    joinChannel(channel) {
      const selectionInfo = {
        channel: channel,
        user: sessionStorage.getItem("aeroUserName"),
      };
      socket.emit("joinRoom", selectionInfo);
      this.$emit("selectedChannel", channel);
      this.isActive = channel;
    },
  },
});
</script>
<style>
.sidebar-item:hover,
.sidebar-item.active {
  background-color: rgba(90, 92, 125, 0.671);
  border-radius: 10px;
  size: 100%;
}
.smaller-text {
  font-size: 0.9rem;
}
</style>
