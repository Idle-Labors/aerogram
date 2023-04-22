<template>
  <div>
    <b-card class="custom-card">
      <b-form-group label="User To Message:">
        <b-form-input required type="text" v-model="username" />
      </b-form-group>

      <div class="login-button mt-4">
        <b-button
          variant="secondary"
          class="mx-3"
          @click="addUserToList"
          type="submit"
          >Add</b-button
        >
        <div class="mt-3" style="color: brown" v-if="errorMsg">
          {{ errorMsg }}
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "../router/api";

export default Vue.extend({
  data() {
    return {
      username: "",
      errorMsg: "",
    };
  },
  components: {},
  methods: {
    addUserToList() {
      this.$emit("close-addUser");
    },
  },
});
</script>
<style scoped>
.custom-card {
  display: inline-flex;
  width: 25%;
  min-width: 350px;
  border-radius: 15px;
  border: none;
  background: #282b30;
  color: #7aa6e9;
  box-shadow: -7px -7px 9px #c4c3ba, 7px 7px 9px #ffffff;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
}

.forgot-create-links a {
  text-decoration: none;
}
</style>
