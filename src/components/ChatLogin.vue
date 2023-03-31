<template>
  <div>
    <b-card class="custom-card">
      <b-form-group label="Username:">
        <b-form-input
          required
          type="text"
          v-model="username"
          placeholder="Enter Username"
        />
      </b-form-group>

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
          @click="loginValidate"
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
import Yup from "yup";
import { user } from "../router/api";

export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
      showPass: false,
      errorMsg: "",
    };
  },
  components: {},
  methods: {
    async loginValidate() {
      const loginSchema = Yup.object().shape({
        username: Yup.string()
          .required("Username Required")
          .max(18, "You reached the maximum number of characters"),
        password: Yup.string()
          .required("Password Required")
          .max(20, "You reached the maximum number of characters"),
      });
      try {
        let isValid = await loginSchema.validate({
          username: this.username,
          password: this.password,
        });
        let response = await user.validationCheck(isValid);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
  background: rgb(118, 160, 118);
  box-shadow: -7px -7px 9px #dfded5, 7px 7px 9px #ffffff;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
}

.forgot-create-links a {
  text-decoration: none;
}
</style>
