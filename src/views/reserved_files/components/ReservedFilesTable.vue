<template>
  <div>
    <FilesTable
      class="ml-5 pb-2"
      :files="reservedFiles.data"
      :loading="reservedFiles.loading"
    >
      <template v-slot:actions="slotProps">
        <v-icon
          small
          class="mr-2"
          @click="pushFileHistoryPage(slotProps.item.id)"
        >
          mdi-history
        </v-icon>
        <v-icon small class="mr-2" @click="postCheckOut(slotProps.item.id)">
          mdi-file-lock-open-outline
        </v-icon>
        <v-icon small @click="showEditDialog(slotProps.item.id)">
          mdi-file-upload-outline
        </v-icon>
      </template>
    </FilesTable>
    <EditFileDialog
      :showCondition="showDialog"
      :fileId = "fileId"
      @closed="closeEditDialog()"
    ></EditFileDialog>
  </div>
</template>

<script>
import FilesTable from "../../../components/FilesTable.vue";
import { useFileStore } from "@/store/FilesStore";
import { mapActions, mapState } from "pinia";
import EditFileDialog from "./EditFileDialog.vue";

export default {
  components: {
    FilesTable,
    EditFileDialog,
  },
  computed: {
    ...mapState(useFileStore, ["reservedFiles"]),
  },
  mounted() {
    this.fetchReservedFiles();
  },
  methods: {
    ...mapActions(useFileStore, ["fetchReservedFiles"]),
    ...mapActions(useFileStore, ["checkOut"]),
    pushFileHistoryPage: function (id) {
      this.$router.push({ name: "file-history", params: { id: id } });
    },
    postCheckOut(id) {
      this.checkOut(id);
    },
    showEditDialog(id) {
      this.fileId = id;
      this.showDialog = true;
    },
    closeEditDialog() {
      this.showDialog = false;
    },
  },
  watch: {
    reservedFiles: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.$nextTick(() => {
          if (newValue.message != "") {
            this.$root.VToast.showMessage(newValue);
          }
        });
      },
    },
  },
  data: () => ({ showDialog: false, fileId: -1 }),
};
</script>
