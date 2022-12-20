<template>
  <div>
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
        <v-list-item-title>{{ username }}</v-list-item-title>
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

      <template v-slot:append>
        <div class="pa-2">
          <v-list-item color="secondary" class="my-6" @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.go();
    },
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
      username:
        JSON.parse(localStorage.getItem("user")) !== null
          ? JSON.parse(localStorage.getItem("user")).name
          : "username",
    };
  },
};
</script>

<style scoped></style>
