import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/home-menu",
    component: () => import("../views/HomeMenu.vue"),
  },
  {
    path: "/restricted-access",
    component: () => import("../views/RestrictedAccess.vue"),
  },
  {
    path: "/advertise-promotion",
    component: () => import("../views/AdvertisePromotion.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: `*`,
    component: () => import("../views/NotFound.vue")
  }
];


const router = new VueRouter({
  routes,
});

export default router;
