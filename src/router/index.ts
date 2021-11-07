import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import App from "@/App.vue";
import SignUp from "@/views/SignUp/Index.vue";
import LogIn from "@/views/LogIn/Index.vue";
import Dashboard from "@/views/Dashboard/Index.vue";
import Proyects from "@/views/Dashboard/Proyects/Index.vue";
import Historias from "@/views/Dashboard/Proyects/Historias/Index.vue";
import Historial from "@/views/Dashboard/Historial/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "",
        name: "LogIn",
        component: LogIn,
      },
      {
        path: "signup",
        name: "SignUp",
        component: SignUp,
      },
      {
        path: "dashboard",
        meta: {
          requiresAuth: true,
        },
        component: Dashboard,
        children: [
          {
            path: "",
            name: "Dashboard",
            meta: {
              requiresAuth: true,
            },
            component: Proyects,
          },
          {
            path: ":id",
            name: "History",
            meta: {
              requiresAuth: true,
            },
            component: Historias,
          },
          {
            path: "/historial/:id",
            name: "Historial",
            meta: {
              requiresAuth: true,
            },
            component: Historial,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: any = { meta: true }, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.userToken) {
      next({ name: "LogIn" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
