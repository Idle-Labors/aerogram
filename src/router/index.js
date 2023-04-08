import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: {
      requiresAuth: true,
    },
  },
  //{
  //path: "/about",
  //name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //component: () =>
  //import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //},
];

const router = new VueRouter({
  routes,
});

export default router;
