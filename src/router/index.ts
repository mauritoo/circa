import { createWebHistory, createRouter } from "vue-router";
import Today from "../views/Today.vue";
import Config from "../views/Config.vue";
import SelectPlace from "../views/SelectPlace.vue";

const routes = [
  {
    path: "/",
    name: "search",
    component: SelectPlace,
  },
  {
    path: "/today",
    name: "Today",
    component: Today,
  },
  {
    path: "/config",
    name: "Config",
    component: Config,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;