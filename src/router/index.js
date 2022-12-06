import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
import RegisterView from "../views/register/RegisterView.vue";
import MyGroupsView from "../views/my_groups/MyGroupsView.vue";
import MyFilesView from "../views/my_files/MyFilesView.vue";
import ReservedFilesView from "../views/reserved_files/ReservedFilesView.vue";
import GroupDetailsView from "../views/group_details/GroupDetailsView.vue";
import FileHistoryView from "../views/file_history/FileHistoryView.vue";
// import { useUserStore } from "../store/UserStore";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/file-history/:id",
    name: "file-history",
    component: FileHistoryView,
  },
  {
    path: "/my-groups",
    name: "my-groups",
    component: MyGroupsView,
  },
  {
    path: "/my-files",
    name: "my-files",
    component: MyFilesView,
  },
  {
    path: "/reserved-files",
    name: "reserved-files",
    component: ReservedFilesView,
  },
  {
    path: "/group-details/:id",
    name: "group-details",
    component: GroupDetailsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// TODO take this value from pinia (useUserStore)
// let isAuth = localStorage.getItem("user") !== null;

// router.beforeEach((to, from, next) => {
//   // const userStore = useUserStore();
//   // console.log(userStore);
//   if (isAuth) {
//     if (to.path == "/login" || to.path == "/register") {
//       next("/");
//     }
//     next();
//   } else if (to.path !== "/login" && to.path !== "/register") {
//     next("/login");
//   }
//   next();
// });

export default router;
