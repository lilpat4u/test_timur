import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./tailwind.css";
import App from "./App.vue";
import routes from "./router/index";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
