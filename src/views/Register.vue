<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="userSignUp">
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
        autocomplete='new-password'
        required/>
      <label for="confirmPassword">Confirm Password</label>
      <input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        v-model="passwordConfirm"
        autocomplete='new-password'
        :rules="[comparePasswords]"
        />
      <input type="submit" value="Sign Up" :disabled="loading"/>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      alert: false
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm
        ? true
        : "Passwords don't match";
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return;
      }
      this.$store.dispatch("userSignUp", {
        email: this.email,
        password: this.password
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
