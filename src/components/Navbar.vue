<template>
  <div>
    <b-sidebar
      visible
      id="sidebar-no-header"
      width="270px"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
      class="navigation"
    >
      <div class="p-3">
        <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
        <slot name="DirectMessageList"></slot>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item active @click="hide">Active</b-nav-item>
            <b-nav-item href="#link-1" @click="">Link</b-nav-item>
            <b-nav-item href="#link-2" @click="">Another Link</b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
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
.navigation {
  background-color: rgba(90, 125, 115);
}
</style>
