<template>
  <div>
    <b-form-group label="Email:">
      <b-form-input
        required
        v-model="email"
        type="email"
        placeholder="Enter Username"
      />
    </b-form-group>

    <b-form-group label="Username:">
      <b-form-input
        required
        v-model="username"
        type="text"
        placeholder="Enter Username"
      />
    </b-form-group>

    <b-form-group label="Password:">
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

    <b-form-group label="Confirm Password:">
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

    <div>
      <b-button variant="dark" @click="submitForm">Sign Up</b-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: "",
      password: {
        password: "",
        passwordCheck: "",
      },
      email: "",
      showPass: false,
    };
  },
  methods: {
    submitForm() {
      alert('Submitted!')
    }
  },
};
</script>
<style scoped></style>
