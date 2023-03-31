<template>
  <div>
    <div class="img-placeholder"></div>
    <b-card class="custom-card">
      <ValidationProvider
        name="email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <b-form-group label="Username:">
          <b-form-input
            required
            type="text"
            v-model="username"
            placeholder="Enter Username"
          />
        </b-form-group>
      </ValidationProvider>
      <b-form-group class="mt-2" label="Password:">
        <b-input-group>
          <b-form-input
            required
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            placeholder="Enter Password"
          />

          <b-input-group-append>
            <b-button variant="outline-secondary" @click="showPass = !showPass">
              <b-icon :icon="showPass ? 'eye-slash' : 'eye'" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <div class="login-button mt-4 mb-4">
        <b-button
          variant="dark"
          class="mx-3"
          @click="submitValidate"
          type="submit"
          >Login</b-button
        >
        <div class="mt-3" style="color: brown" v-if="errorMsg">
          {{ errorMsg }}
        </div>
      </div>

      <div class="forgot-create-links d-flex justify-content-evenly">
        <b-link to="/forgotPassword" class="small text-muted"
          >Forgot Password</b-link
        >
        <b-link to="/createAccount" class="small text-muted"
          >Don't have an account?</b-link
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { ValidationProvider } from "vee-validate";

export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
      showPass: false,
      errorMsg: "",
    };
  },
  components: {
    ValidationProvider,
  },
  methods: {
    submitValidate() {
      if (this.username === "" || this.password === "") {
        this.errorMsg = "Please enter your username and password";
        return false;
      }
      if (this.username.length > 12) {
        this.errorMsg = "Username must be 12 characters or less";
        return false;
      }
      return true;
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
  background: #a0c1d1;
  box-shadow: -7px -7px 9px #dfded5, 7px 7px 9px #ffffff;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
}

.img-placeholder {
  background-color: rgb(118, 160, 118);
  height: 12rem;
}
.forgot-create-links a {
  text-decoration: none;
}
</style>
