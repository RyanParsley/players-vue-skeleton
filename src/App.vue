<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Log in</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.$store.state.token = localStorage.getItem("token");
    if (localStorage.getItem("user")) {
      this.$store.state.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    ...mapActions(["logOut"])
  }
};
</script>

// SCSS or CSS is supported out of the box, use what brings you joy!
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
