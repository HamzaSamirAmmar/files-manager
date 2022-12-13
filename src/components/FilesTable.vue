<template>
  <div>
    <DataTable
      :items="files"
      :headers="headers"
      :loading="loading"
      :selectable="selectable"
      @item-selected="itemSelected"
      @toggle-select-all="toggleSelectAll"
    >
      <template v-slot:actions="slotProps">
        <slot name="actions" :item="slotProps.item"></slot>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";

export default {
  components: {
    DataTable,
  },
  props: {
    files: Array,
    loading: Boolean,
    selectable: Boolean,
  },
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "status", value: "status" },
      //TODO depends on data fetch (reserver_name)
      { text: "reserver", value: "reserver.name" },
      { text: "Actions", sortable: false, value: "actions" },
    ],
  }),
  methods: {
    itemSelected(item) {
      this.$emit('item-selected',item);
    },
    toggleSelectAll(item) {
      this.$emit('toggle-select-all',item);
    },
  },
};
</script>
