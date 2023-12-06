import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    comments: "home",
  },
  {
    path: "/",
    comments: "home3",
  },
  {
    path: "/",
    comments: "home4",
  },
];

export const fn = () => {
  console.log();
};
export const fnb = () => {
  console.log();
};
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
