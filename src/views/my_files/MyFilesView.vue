<template>
  <div>
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-row no-gutters class="pb-5">
          <div class="text-h3" style="color: #424242">My Files</div>
          <v-spacer></v-spacer>
          <CreateButton
            entityName="file"
            @click.native="showCreateDialog()"
          ></CreateButton>
        </v-row>
        <MyFilesTable />
      </v-col>
    </v-container>
    <CreateFileDialog :showCondition="showDialog" @closed="closeCreateDialog()"></CreateFileDialog>
  </div>
</template>

<script>
import CreateButton from "./../../components/buttons/CreateButton.vue";
import CreateFileDialog from "./components/CreateFileDialog.vue";
import MyFilesTable from "./components/MyFilesTable.vue";

export default {
  components: {
    CreateButton,
    CreateFileDialog,
    MyFilesTable,
  },
  data: () => ({
    showDialog: false,
    links: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "My Files",
        disabled: true,
        href: "#",
      },
    ],
  }),
  methods: {
    showCreateDialog() {
      this.showDialog = true;
    },
    closeCreateDialog() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped></style>
