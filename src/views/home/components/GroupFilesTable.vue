<template>
  <div>
    <FilesTable  :headers="headers" :loading="loading">
      <!-- <template v-slot:actions="slotProps">
        <v-icon small @click="showDeleteDialog(slotProps.item)">
          mdi-account-remove
        </v-icon>
      </template> -->
    </FilesTable>
  </div>
</template>

<script>
import FilesTable from "./../../../components/FilesTable.vue";

export default {
  components: { FilesTable },
  data: () => ({
    loading: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Status", value: "status" },
      { text: "Reserver", value: "reserver" },
      { text: "Actions", sortable: false, value: "actions" },
    ],
    groupFiles: [
      { id: 1, name: "Public Group" },
      { id: 2, name: "SASS" },
      { id: 3, name: "CSS" },
    ],
  }),
};
</script>

<style scoped></style>
