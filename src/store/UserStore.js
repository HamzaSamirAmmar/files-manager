import { User } from "@/models/UserModel";
import { defineStore } from "pinia";
import Repository from "../repositories/RepositoryFactory";
import router from "../router/index";

const authRepository = Repository.get("auth");

// TODO: store state in the local storage

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: localStorage.getItem("user") || null,
    loading: false,
  }),
  getters: {
    isAuthenticated() {
      return this.user.accessToken === null;
    },
    getUser() {
      return this.user;
    },
    getId() {
      return this.user.id;
    },
    getToken() {
      return this.user.accessToken;
    },
  },
  actions: {
    login(email, password) {
      console.log(this.user);
      this.loading = true;
      authRepository
        .login(email, password)
        .then((response) => {
          this.loading = false;
          this.user = new User(response.data);
          localStorage.setItem("user", this.user);
          router.push("/");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    register(email, password, username) {
      this.loading = true;
      authRepository
        .register(email, password, username)
        .then((response) => {
          this.loading = false;
          this.user = new User(response.data);
          localStorage.setItem("user", this.user);
          router.push("/");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    logout() {
      this.user = null;
    },
  },
});
