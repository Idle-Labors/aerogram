<template>
  <div>
    <b-sidebar
      visible
      id="sidebar"
      text-variant="light"
      width="220px"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
      no-close-on-esc
    >
      <h4 style="width: 100%" class="header">
        <img src="@/assets/paper-plane-fill-light.svg" class="img mt-4 mb-5" />
      </h4>
      <div class="p-3 mt-3">
        <slot name="DirectMessageList"></slot>
        <slot name="ChannelList"></slot>
      </div>
      <template #footer="{ hide }">
        <div class="footer text-light p-1 flex-row">
          <b-button-group>
            <b-button
              size=""
              variant="outline-success"
              class="text-color"
              @click="addChannel"
            >
              <span class="text-color">
                <b-icon icon="plus-circle-fill"></b-icon> Private
              </span>
            </b-button>
            <b-button size="" variant="outline-success" @click="addUser">
              <span class="text-color">
                <b-icon icon="person-plus-fill"></b-icon> Join
              </span>
            </b-button>
            <b-button size="" variant="outline-success" @click="logout">
              <span class="text-color">
                <b-icon icon="person-plus-fill"></b-icon> Logout
              </span>
            </b-button>
          </b-button-group>
        </div>
      </template>
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
  methods: {
    logout() {
      localStorage.removeItem("aeroChatToken");
      this.$router.push("/");
    },
    addUser() {
      this.$emit("render-addUser");
      console.log("emit success");
    },
    addChannel() {
      this.$emit("render-addChannel");
      console.log("Emit success");
    },
  },
});
</script>

<style>
.sidebar-item:hover {
  background-color: rgba(90, 92, 125, 0.671);
  border-radius: 10px;
  size: 100%;
}

.footer .btn-outline-success {
  border-color: rgba(90, 92, 125);
}
.footer .btn-outline-success:hover {
  color: #fff;
  background-color: rgba(90, 92, 125);
  border-color: rgba(90, 92, 125);
}
.header {
  background-color: rgb(109, 111, 150);
}
.sidebar-item:hover {
  background-color: rgba(90, 92, 125, 0.671);
  border-radius: 10px;
  size: 100%;
}
.footer {
  background-color: #282b30;
}

.img {
  width: 5rem;
  height: 5rem;
}

.text-color {
  color: #7aa6e9;
}

.smaller-icon {
  font-size: 0.7rem;
}
</style>
