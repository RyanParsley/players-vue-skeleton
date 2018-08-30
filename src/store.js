import Vue from "vue";
import Vuex from "vuex";
import api from "./api";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: "Who can hire ryan The fastest!",
    user: null,
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || "",
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
    removePlayer(state, payload) {
      let players = state.players;
      players.splice(players.indexOf(payload), 1);
    },
    pushPlayer(state, payload) {
      state.players.push(payload);
      state.success = true;
    },
    setPlayers(state, payload) {
      state.players = payload;
    }
  },
  actions: {
    signup({ commit }, creds) {
      commit("login");
      api
        .post("user", {
          first_name: creds.first_name,
          last_name: creds.last_name,
          email: creds.email,
          password: creds.password,
          confirm_password: creds.confirm_password
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          commit("loginSuccess", response.data.user);
          router.push("/roster");
        })
        .catch(function(error) {
          commit("loginFail", error.response.data.error.message);
        });
    },
    login({ commit }, creds) {
      commit("login");
      api
        .post("login", {
          email: creds.email,
          password: creds.password
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          commit("loginSuccess", response.data.user);
          router.push("/roster");
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
    getPlayers: function({ commit }) {
      api.get("players").then(function(response) {
        commit("setPlayers", response.data.players);
      });
    },
    addPlayer: function({ commit }, payload) {
      api
        .post("players", payload)
        .then(function(response) {
          if (response.data.success) {
            commit("pushPlayer", payload[0]);
            router.push("/roster");
          }
        })
        .catch(function(error) {
          commit("loginFail", error.response.data.error.message);
        });
    },
    deletePlayer: function({ commit }, payload) {
      api.delete("players/" + payload.id).then(function(response) {
        if (response.success) {
          commit("removePlayer", payload);
          console.log("delete was successful");
        }
      });
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
    },
    getPlayerById: state => id => {
      const fallback = {
        first_name: "",
        last_name: "",
        rating: 0,
        handedness: ""
      };
      return state.players.find(player => player.id === id) || fallback;
    }
  }
});
