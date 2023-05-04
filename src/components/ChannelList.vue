<template>
  <div>
    <p
      v-b-toggle.collapse-chan
      class="sidebar-item h5 mb-2 flex-row text-color"
    >
      <b-icon icon="hash"></b-icon>
      Channels
    </p>
    <b-collapse id="collapse-chan" visible>
      <div
        v-for="channel in channels"
        :key="channel"
        @click="joinChannel(channel)"
      >
        <p class="smaller-text sidebar-item text-color">
          <b-icon icon="hash"></b-icon> {{ channel }}
        </p>
      </div>
      <p class="smaller-text sidebar-item text-color">
        <b-icon icon="hash"></b-icon>
        SomeChannel
      </p>
      <p class="smaller-text sidebar-item text-color">
        <b-icon icon="hash"></b-icon>
        AnotherChannel
      </p>
    </b-collapse>
  </div>
</template>
<script>
import Vue from "vue";
import socket from "@/modules/socket.js";

export default Vue.extend({
  props: {
    channels: {
      type: Array,
      default: () => [],
    },
  },
  data() {},
  components: {},
  methods: {
    joinChannel(channel) {
      socket.emit("join", channel);
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
  margin-bottom: 0;
}

.smaller-icon {
  font-size: 0.7rem;
}

.text-color {
  color: aliceblue;
}
</style>
