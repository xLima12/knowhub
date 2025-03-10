import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";
import ArticlesByCategory from "@/components/article/ArticlesByCategory";
import ArticleById from "@/components/article/ArticleById.vue";
import Auth from "@/components/auth/Auth";
import { userKey } from "@/global";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "adminPages",
    component: AdminPages,
    meta: { requiresAdmin: true },
  },
  {
    path: "/categories/:id/articles",
    name: "articlesByCategory",
    component: ArticlesByCategory,
  },
  {
    path: "/articles/:id",
    name: "articleById",
    component: ArticleById,
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
