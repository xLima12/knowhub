import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";
import ArticlesByCategory from "@/components/article/ArticlesByCategory";
import ArticleById from "@/components/article/ArticleById.vue";

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
  {
    name: "articlesByCategory",
    path: "/categories/:id/articles",
    component: ArticlesByCategory,
  },
  {
    name: "articleById",
    path: "/articles/:id",
    component: ArticleById,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
