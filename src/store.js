import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: "Who can hire ryan The fastest!",
    user: null,
    isLoggedIn: !!localStorage.getItem("token"),
    players: [],
    error: null,
    success: null,
    loading: false
  },
  mutations: {
    login(state) {
      state.pending = true;
    },
    loginSuccess(state, payload) {
      state.isLoggedIn = true;
      state.pending = false;
      state.user = payload;
    },
    loginFail(state, payload) {
      state.isLoggedIn = false;
      state.pending = false;
      state.error = payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setPlayers(state, payload) {
      state.players = Object.keys(payload).map(function(key) {
        return { key: payload[key].key, value: payload[key].value };
      });
    },
    removePlayer(state, payload) {
      console.log("removePlayer: ", payload);
    },
    pushPlayer(state, payload) {
      console.log("pushPlayer: ", payload);
      state.success = true;
    }
  },
  actions: {
    login({ commit }, creds) {
      commit("login");
      axios
        .post("https://players-api.developer.alchemy.codes/api/login", {
          email: creds.email,
          password: creds.password
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          commit("loginSuccess", response.data.user);
        })
        .catch(function(error) {
          commit("loginFail", error.response.data.error.message);
        });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("setUser", null);
      commit("logout");
    },
    addPlayer: function({ commit }, payload) {
      commit("pushPlayer", payload);
    }
  },
  getters: {
    appTitle(state) {
      return state.appTitle;
    },
    getPlayers(state) {
      return state.players;
    },
    getUser(state) {
      return state.user;
    },
    getError(state) {
      return state.error;
    },
    getLoading(state) {
      return state.loading;
    }
  }
});
