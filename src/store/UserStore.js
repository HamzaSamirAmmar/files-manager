import { User } from "@/models/UserModel";
import { defineStore } from "pinia";
import authRepository from "../repositories/AuthRepository";
import router from "../router/index";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user:
      localStorage.getItem("user") === null
        ? null
        : JSON.parse(localStorage.getItem("user")),
    loading: false,
    error:false,
    message:''
  }),
  getters: {
    isAuthenticated() {
      return this.user !== null;
    },
    getUser() {
      return this.user !== null ? this.user : null;
    },
    getId() {
      return this.user !== null ? this.user.id : null;
    },
    getToken() {
      return this.user !== null ? this.user.token : null;
    },
  },
  actions: {
    resetErrorNMessage(){
        this.message='',
        this.error=false;
    },
    login(email, password) {
      console.log(this.user);
      this.loading = true;
      authRepository
        .login(email, password)
        .then((response) => {
          this.loading = false;
          this.user = new User(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          router.push("/");
          router.go(router.currentRoute);
        })
        .catch((err) => {
          this.loading = false;
          this.error=true;
          this.message=err.response.data.errors[0][0];
        });
    },
    register(email, password, username) {
      this.loading = true;
      authRepository
        .register(email, password, username)
        .then((response) => {
          this.loading = false;
          this.user = new User(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          router.push("/");
          router.go(router.currentRoute);
        })
        .catch((err) => {
          this.loading = false;
          this.error=true;
          this.message=err.response.data.errors[0][0];
        });
    },
    logout() {
      this.user = null;
      router.push("/login");
    },
  },
});
