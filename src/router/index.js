import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reserva from "../views/Reserva.vue";
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/reserva",
    name: "Reserva",
    component: Reserva,
    meta:{requireAuth: true}
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (!store.state.logged) {
			next({ path: "/" });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
