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
      </template>
    </FilesTable>
  </div>
</template>

<script>
import FilesTable from "../../../components/FilesTable.vue";
import { useFileStore } from "@/store/FilesStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FilesTable,
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
  data: () => ({}),
};
</script>
