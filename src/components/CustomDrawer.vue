<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    color="primary"
    dark
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="../assets/unknown-person.webp"></v-img>
      </v-list-item-avatar>

      <!--  TODO: get the name from state management (useUserStore) after login -->
      <v-list-item-title>{{username}}</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.link"
        color="secondary"
        class="my-6"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import { useUserStore } from "../store/UserStore";
// import pinia from "../store";

export default {
  computed: {},
  methods: {},
  setup() {
    // initialize the store
    // const userStore = useUserStore(pinia);
    // console.log(userStore);
    // return {userStore}
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home", link: "/" },
        { title: "My Files", icon: "mdi-file-multiple", link: "/my-files" },
        {
          title: "My Groups",
          icon: "mdi-account-group",
          link: "/my-groups",
        },
        {
          title: "Reserved Files",
          icon: "mdi-file-lock",
          link: "/reserved-files",
        },
      ],
      mini: true,
      username: JSON.parse(localStorage.getItem("user")) !== null ?  JSON.parse(localStorage.getItem("user")).name : "username",
    };
  },
};
</script>

<style scoped></style>
