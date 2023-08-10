import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/userHome',
      name: 'userHome',
      component:() => import('@/views/userHome'),
    },
  ],
});
