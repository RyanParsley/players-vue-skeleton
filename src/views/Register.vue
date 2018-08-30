<template>
  <div class="register">
    <h1>Register</h1>
    <div class="error" v-if="this.password === this.confirm_password">
      {{ comparePassword  }}
    </div>
    <form @submit.prevent="signup">
      <label for="first_name">First Name</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        v-model="first_name"
        />
      <label for="last_name">Last Name</label>
      <input
        name="lastName"
        id="lastName"
        type="text"
        v-model="last_name"
        />
      <label for="email">Email</label>
      <input
        name="email"
        id="email"
        type="email"
        v-model="email"
        autocomplete="email"
        required/>
      <label for="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        v-model="password"
        required/>
      <label for="confirmPassword">Confirm Password</label>
      <input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        v-model="confirm_password"
        :rules="[comparePasswords]"
        />
      <input id="register" type="submit" value="Sign Up" :disabled="loading"/>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      alert: false
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.confirm_password
        ? true
        : "Passwords don't match";
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    signup() {
      if (this.comparePasswords !== true) {
        return;
      }
      this.$store.dispatch("signup", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      });
    },
    error() {
      return this.$store.getters.getError;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.dispatch("setError", null);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
form {
  text-align: center;
}
input {
  display: block;
  margin: 0.25em auto 1em auto;
}
</style>
