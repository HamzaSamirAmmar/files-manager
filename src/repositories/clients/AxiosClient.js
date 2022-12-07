// import router from "@/router";
import axios from "axios";
// import pinia from '../../store';
// import { useUserStore } from "@/store/UserStore";

// const userStore=useUserStore(pinia);
// FIXME const userAccessToken=userStore.getToken();

const baseDomain = process.env.VUE_APP_API_DOMAIN;
const baseURL = `${baseDomain}/api`;
console.log(baseURL);

// TODO take user token local storage
const userAccessToken = "46|YzhUrWIjFzTALFfoeqS9B9WdnnF1o2sZsR3JIVpH";

const httpClient = axios.create({
  baseURL,
  responseType: "json",
  headers: {
    Authorization: `Bearer ${userAccessToken}`,
  },
  timeout: 20000,
});

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default httpClient;
