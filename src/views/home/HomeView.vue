<template>
  <div>
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="text-h3 mb-10" style="color: #424242">Engaged groups</div>
        <GroupFilesTable />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import GroupFilesTable from "./components/GroupFilesTable.vue";
export default {
  components: {
    GroupFilesTable,
  },
  data: () => ({
    links: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
    ],
  }),
  methods: {},
};
</script>

<style scoped></style>
