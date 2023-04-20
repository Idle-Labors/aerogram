import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    /*meta: {
      requiresAuth: true,
    },*/
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
//this logic should be fixed up for sure
/*
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("idleChatToken");
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "Chat" });
  } else {
    next();
  }
});
*/

export default router;
