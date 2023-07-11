import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: "login",
      path: "/user/login",
      component: () => import("@/views/Login"),
      meta: {
        isShowNav: false,
      },
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/views/Home"),
      meta: {
        isShowNav: true,
      },
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
