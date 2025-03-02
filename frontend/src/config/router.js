import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPages,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
