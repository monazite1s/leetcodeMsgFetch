import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/DataShow" },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/DataShow",
        name: "dataShow",
        component: () =>
          import(/* webpackChunkName: "DataShow" */ "../views/DataShow.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
