<template>
  <div>
    <FilesTable
      class="ml-5 pb-2"
      :files="ownedFiles"
      :loading="ownedFilesLoading"
    >
      <template v-slot:actions="slotProps">
        <v-icon
          small
          class="mr-2"
          @click="pushFileHistoryPage(slotProps.item.id)"
        >
          mdi-history
        </v-icon>
        <v-icon small class="mr-2" @click="showDeleteDialog(slotProps.item)">
          mdi-delete
        </v-icon>
      </template>
    </FilesTable>
    <DeleteDialog :showCondition="dialogDelete" @closed="closeDeleteDialog()">
      <template v-slot:title>
        Are you sure you want to delete this item?
      </template>
      <template v-slot:actions>
        <v-btn color="blue darken-1" text @click="closeDeleteDialog()"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
          >OK</v-btn
        >
      </template>
    </DeleteDialog>
  </div>
</template>

<script>
import FilesTable from "../../../components/FilesTable.vue";
import DeleteDialog from "./../../../components/FormDialog.vue";
import { useFileStore } from "@/store/FilesStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FilesTable,
    DeleteDialog,
  },
  computed: {
    ...mapState(useFileStore, [
      "ownedFiles",
      "ownedFilesLoading",
      "ownedFilesHasError",
      "ownedFilesError",
    ]),
  },
  mounted() {
    this.fetchMyFiles();
  },
  methods: {
    ...mapActions(useFileStore, ["fetchMyFiles"]),
    ...mapActions(useFileStore, ["deleteOwnedFile"]),
    pushFileHistoryPage: function (id) {
      this.$router.push({ name: "file-history", params: { id: id } });
    },
    showDeleteDialog(item) {
      this.selectedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.selectedItem = {};
    },
    deleteItemConfirm() {
      this.deleteOwnedFile(this.selectedItem.id,this.selectedItem.order);
      this.closeDeleteDialog();
    },
  },
  watch: {
    // TODO: change owned files to base state type
    // ownedFiles: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue) {
    //     this.$nextTick(() => {
    //       if (newValue) {
    //         this.$root.VToast.showErrorMessage(this.ownedGroupsError);
    //       }
    //     });
    //   },
    // },
  },
  data: () => ({
    dialogDelete: false,
    selectedItem: {},
  }),
};
</script>
