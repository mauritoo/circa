import { createWebHistory, createRouter } from "vue-router";
import Today from "../views/Today.vue";
import SelectPlace from "../views/SelectPlace.vue";

const routes = [
  {
    path: "/",
    name: "SelectPlace",
    component: SelectPlace,
  },
  {
    path: "/today",
    name: "Today",
    component: Today,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;