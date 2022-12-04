import { defineStore } from "pinia";

// TODO: store state in the local storage

export const userUserStore = defineStore("userStore", {
  state: () => ({
    isAuthenticated: false,
    username: null,
    email: null,
    id: null,
  }),
  getters: {
    isAuthenticated() {
      return this.isAuthenticated;
    },
    user() {
      return {
        username: this.username,
        email: this.email,
        id: this.id,
      };
    },
    id() {
      return this.id;
    },
  },
  actions: {
    setUser(user) {
      this.username = user.username;
      this.email = user.email;
      this.id = user.id;
      this.isAuthenticated = true;
    },
    removeUser() {
      this.username = null;
      this.email = null;
      this.id = null;
      this.isAuthenticated = false;
    },
    toggleAuth(value) {
      this.isAuthenticated = value || !this.isAuthenticated;
    },
  },
});
