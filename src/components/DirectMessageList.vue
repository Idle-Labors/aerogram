<template>
  <div>
    <div class="mb-3">
      <p v-b-toggle.collapse-dm class="h5 text-color mb-2 flex-row">
        <b-icon icon="chat-text-fill"></b-icon>
        Direct Messages
      </p>
      <b-collapse id="collapse-dm" visible class="mb-2">
        <p class="smaller-text">
          <b-icon icon="circle-fill" variant="danger"></b-icon>
          Username
        </p>
        <p class="smaller-text">
          <b-icon icon="circle-fill" variant="success"></b-icon>
          Another Username
        </p>
      </b-collapse>
    </div>
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
}
.text-color {
  color: #7aa6e9;
}
</style>
