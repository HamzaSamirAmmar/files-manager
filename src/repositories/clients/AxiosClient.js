import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import pinia from "@/store";

const baseDomain = process.env.VUE_APP_API_DOMAIN;
const baseURL = `${baseDomain}/api`;
console.log(baseURL);

const userStore = useUserStore(pinia);

console.log(userStore.getToken);

const httpClient = axios.create({
  baseURL,
  responseType: "json",
  headers: {
    Authorization: `Bearer ${userStore.getToken}`,
  },
  timeout: 20000,
});

// httpClient.interceptors.request.use((config) => {
//   const userStore = useUserStore(pinia);
//   config.headers.Authorization = `Bearer ${userStore.getToken}`;
//   config.headers.Accept = "application/json";
//   return config;
// });

// // Add a response interceptor
// httpClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default httpClient;
