<template>
  <v-app>
    <CustomDrawer v-if="isAuth"/>
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CustomDrawer from "./components/CustomDrawer.vue";
export default {
  components: {
    CustomDrawer,
  },
  data() {
    return {
      isAuth: false,
    };
  },
};
</script>

<style></style>
