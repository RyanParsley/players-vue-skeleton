<template>
  <div class="login">
    <h1>This is the login page</h1>
    <div class="error" v-if="error">
      {{ error }}
    </div>
    <form @submit.prevent="login({ email, password})">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="email"
        id="email"
        v-model="email"
        />
      <label for="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        placeholder="password"
        v-model="password"
        />
      <input id="login" type="submit" value="Sign In" :disabled="loading"/>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      alert: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    loading() {
      return this.$store.getters.getLoading;
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
        this.$store.dispatch("setError", false);
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
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
.error {
  border: solid 1px red;
  padding: 1em;
  margin: 1em;
}
</style>
