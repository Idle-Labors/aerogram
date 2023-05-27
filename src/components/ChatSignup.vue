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
          placeholder="Enter Email"
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

          <b-input-group-append is-text>
            <b-icon
              :icon="showPass ? 'eye-slash' : 'eye'"
              font-scale="1.5"
              @click="showPass = !showPass"
            />
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group class="mt-2" label="Confirm Password:">
        <b-input-group>
          <b-form-input
            required
            v-model="passwordCheck"
            :type="showConf ? 'text' : 'password'"
            placeholder="Re-Enter Password"
          />

          <b-input-group-append is-text>
            <b-icon
              :icon="showConf ? 'eye-slash' : 'eye'"
              font-scale="1.5"
              @click="showConf = !showConf"
            />
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <div class="mt-3" style="color: brown" v-if="errorMsg">
        {{ errorMsg }}
      </div>

      <div class="d-flex justify-content-evenly">
        <div class="login-button mt-4 mb-2">
          <b-button variant="light" class="mx-3" @click="cancel" type="submit"
            >Cancel</b-button
          >
        </div>
        <div class="login-button mt-4 mb-2">
          <b-button
            variant="dark"
            class="mx-3"
            @click="signupValidate"
            type="submit"
            >Sign Up</b-button
          >
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { user } from "@/router/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      passwordCheck: "",
      email: "",
      showPass: false,
      showConf: false,
      errorMsg: "",
    };
  },
  methods: {
    async signupValidate() {
      try {
        let response = await user.signup({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });
        if (response.data.success === true) {
          this.$emit("signup-success");
        } else {
          this.errorMsg = response.message;
        }
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.$emit("signup-cancel");
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
  background: linear-gradient(315deg, #b4b4ac, #d4d4d496);
  margin: 0 auto;
  margin-top: 2rem;
}
</style>
