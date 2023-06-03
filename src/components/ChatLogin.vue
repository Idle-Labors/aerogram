<template>
  <div>
    <b-card class="custom-card" @keyup.enter="loginValidate">
      <b-form-group label="Username:">
        <b-form-input
          required
          type="text"
          v-model="username"
          placeholder="Enter Username"
        />
      </b-form-group>

      <b-form-group class="mt-3" label="Password:">
        <b-input-group>
          <b-form-input
            required
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            placeholder="Enter Password"
          /><b-input-group-append is-text>
            <b-icon
              :icon="showPass ? 'eye-slash' : 'eye'"
              font-scale="1.5"
              @click="showPass = !showPass"
            />
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

      <div class="forgot-create-links d-flex justify-content-between">
        <b-link to="/forgotPassword" class="small text-muted"
          >Forgot Password</b-link
        >
        <b-link class="small text-muted" @click="signup"
          >Don't have an account?</b-link
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { user } from "@/router/api";

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
    signup() {
      this.$emit("render-signup");
    },
    async loginValidate() {
      try {
        let response = await user.login({
          username: this.username,
          password: this.password,
        });
        if (response.data.success === true) {
          localStorage.setItem("aeroChatToken", response.data.token);
          sessionStorage.setItem("aeroUserName", response.data.user);
          //document.cookie = `token=${response.data.token}; Path=/; HttpOnly`;
          this.$emit("login-success");
        } else {
          this.errorMsg = response.message;
        }
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
  background: linear-gradient(315deg, #b4b4ac, #d4d4d496);

  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
}
.forgot-create-links a {
  text-decoration: none;
}
</style>
