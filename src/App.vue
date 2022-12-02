<template>
  <v-app>
    <custom-drawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CustomDrawer from "./components/CustomDrawer.vue";
export default {
  components: {
    "custom-drawer": CustomDrawer,
  },
  data() {
    return{
      
    }
  },
};
</script>

<style></style>
