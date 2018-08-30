import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Player from "./views/Player";
import PlayerNew from "./views/PlayerNew";
import PlayerUpdate from "./views/PlayerUpdate";
import NotFound from "./views/NotFound";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/player",
      name: "player",
      alias: "/roster",
      component: Player
    },
    {
      path: "/player/new",
      name: "playerNew",
      component: PlayerNew
    },
    {
      path: "/player/:id",
      name: "playerUpdate",
      component: PlayerUpdate
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  //TODO: Assign this post login or from session
  const currentUser = false;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next("/login");
    }
  }
  if (to.matched.some(record => record.meta.requiresAnon)) {
    if (currentUser) {
      next("/");
    }
  }
  next();
});

export default router;
