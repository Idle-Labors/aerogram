<template>
  <div>
    <p v-b-toggle.collapse-3 class="h4 mb-2 flex-row">
      <b-icon icon="chat-text-fill"></b-icon>
      Direct Messages
    </p>
    <b-collapse visible id="collapse-3">
      <p>
        <b-icon icon="circle-fill" variant="danger"></b-icon>
        Username
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
</style>
