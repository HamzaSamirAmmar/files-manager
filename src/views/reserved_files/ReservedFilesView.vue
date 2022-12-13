<template>
  <div>
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="text-h3 mb-10" style="color: #424242">Reserved Files</div>
        <ReservedFilesTable />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import ReservedFilesTable from "./components/ReservedFilesTable.vue";

export default {
  components: {
    ReservedFilesTable,
  },
  data: () => ({
    links: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Reserved Files",
        disabled: true,
        href: "#",
      },
    ],
  }),
  methods: {},
};
</script>

<style scoped></style>
