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

      <b-form-group class="mt-2" label="Email:">
        <b-form-input
          required
          v-model="email"
          type="email"
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

      <b-form-group class="mt-2" label="Confirm Password:">
        <b-input-group>
          <b-form-input
            required
            v-model="passwordCheck"
            :type="showPass ? 'text' : 'password'"
            placeholder="Re-Enter Password"
          />

          <b-input-group-append>
            <b-button variant="outline-secondary" @click="showPass = !showPass">
              <b-icon :icon="showPass ? 'eye-slash' : 'eye'" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <div class="mt-3" style="color: brown" v-if="errorMsg">
          {{ errorMsg }}
        </div>

      <div class="d-flex justify-content-evenly">
        <div class="login-button mt-4 mb-4">
          <b-button
            variant="dark"
            class="mx-3"
            @click="signupValidate"
            type="submit"
            >Sign Up</b-button
          >
        </div>
        <div class="login-button mt-4 mb-4">
          <b-button
            variant="light"
            class="mx-3"
            @click="signupValidate"
            type="submit"
            >Cancel</b-button
          >
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Yup from "yup";
import { user } from "../router/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      passwordCheck: "",
      email: "",
      showPass: false,
      errorMsg: "",
    };
  },
  methods: {
    async signupValidate() {
      const signupSchema = Yup.object().shape({
        username: Yup.string()
          .required("Username Required")
          .max(18, "You reached the maximum number of characters"),
        email: Yup.string().email("Invalid email").required("Email Required"),
        password: Yup.string()
          .required("Password Required")
          .max(20, "You reached the maximum number of characters"),
        passwordCheck: Yup.string()
          .required("Confirm Password Required")
          .oneOf([Yup.ref("password")], "Passwords must match"),
      });
      try {
        let isValid = await signupSchema.validate({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });
        let response = await user.signup(isValid);
        if (response.success === true) {
          this.$emit("signup-success");
        } else {
          this.errorMsg = response.message;
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
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
  margin-top: 2rem;
}
</style>
