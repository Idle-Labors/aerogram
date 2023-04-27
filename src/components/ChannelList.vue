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
export default Vue.extend({
  data() {
    return {};
  },
  components: {},
  methods: {},
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
