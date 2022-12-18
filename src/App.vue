<template>
  <v-app>
    <!-- drawer -->
    <CustomDrawer v-if="isAuth" />
    <!-- toast -->
    <VToast ref="VToast" />
    <!-- page view -->
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CustomDrawer from "./components/CustomDrawer.vue";
import VToast from "./components/VToast.vue";
// import {useUserStore} from "./store/UserStore";
// import pinia from "./store";



export default {
  data() {
    return {
      isAuth: localStorage.getItem("user") !== null,
    };
  },
  setup() {
    // initialize the store
    // const userStore = useUserStore(pinia);
    // return {userStore}
  },
  components: {
    CustomDrawer,
    VToast,
  },
  mounted() {
    this.$root.VToast = this.$refs.VToast;
  },
};
</script>

<style></style>
