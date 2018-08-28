import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Players from "./views/Players.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAnon: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAnon: true
      }
    },
    {
      path: "/players",
      name: "players",
      component: Players,
      meta: {
        requiresAuth: true
      }
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
