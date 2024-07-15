import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
