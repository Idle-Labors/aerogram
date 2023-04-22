<template>
  <div>
    <p v-b-toggle.collapse-chan class="h5 mb-2 flex-row text-color">
      <b-icon icon="hash"></b-icon>
      Channels
    </p>
    <b-collapse id="collapse-chan" visible>
      <p class="smaller-text">
        <b-icon icon="hash"></b-icon>
        Chuck
      </p>
      <p class="smaller-text">
        <b-icon icon="hash"></b-icon>
        Sneed
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
.smaller-text {
  font-size: 0.9rem;
  margin-bottom: 0;
}
.smaller-icon {
  font-size: 0.7rem;
}
.text-color {
  color: #7aa6e9;
}
</style>
