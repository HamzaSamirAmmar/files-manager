import Client from "./clients/AxiosClient";

export default {
  login(email, password) {
    return Client.post("/login", {
      email: email,
      password: password,
    });
  },

  logout() {
    return Client.post("/logout");
  },

  register(email, password, name) {
    return Client.post("/register", {
      email: email,
      password: password,
      name: name,
    });
  },
};
