import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/userHome",
      name: "userHome",
      component: () => import("@/views/userHome"),
    },
    {
      path: "/memberList",
      name: "memberList",
      component: () => import("@/views/memberList"),
    },
  ],
});

export default router;
