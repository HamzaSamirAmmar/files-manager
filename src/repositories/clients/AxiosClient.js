import axios from "axios";
// import pinia from '../../store';
// import { useUserStore } from "@/store/UserStore";

// const userStore=useUserStore(pinia);
// FIXME const userAccessToken=userStore.getToken();

const baseDomain = process.env.VUE_APP_API_DOMAIN;
const baseURL = `${baseDomain}/api`;

// TODO take user token local storage
const userAccessToken='5|BxhkoKLmUWGjkm7HENFWwrmQA5WdhPooWtqqF28h';

export default axios.create({
    baseURL,
    responseType: 'json',
    headers: {
        "Authorization": `Bearer ${userAccessToken}`
    },
    timeout: 20000,
});