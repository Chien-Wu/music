import { createRouter, createWebHistory } from "vue-router";
import Suggestions from "../views/Suggestions.vue";
import Homeview from "../views/Homeview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/suggestions",
      name: "suggestions",
      component: Suggestions,
    },
    {
      path: "/",
      name: "homeview",
      component: Homeview,
    },
  ],
});

export default router;
