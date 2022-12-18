<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="mt-10"
        small
        @click="postBulkCheckIn"
        v-show="showBulkCheckInButton()"
      >
        Bulk Check In
        <v-icon> mdi-file-lock</v-icon>
      </v-btn>
    </v-row>
    <v-col v-for="group in joinedGroups.data" :key="group.id">
      <v-row class="my-5">
        <v-icon large color="primary"> mdi-account-multiple </v-icon>
        <div class="text-h4 font-weight-medium ml-5 primary--text">
          {{ group.name }}
        </div>
      </v-row>
      <FilesTable
        class="ml-5 pb-2"
        :files="group.files"
        :loading="checkIn.loading"
        :selectable="true"
        @item-selected="itemSelected"
        @toggle-select-all="toggleSelectAll"
      >
        <template v-slot:actions="slotProps">
          <v-icon
            small
            class="mr-2"
            @click="pushFileHistoryPage(slotProps.item.id)"
          >
            mdi-history
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="checkIn(slotProps.item.id, group.id)"
          >
            mdi-file-lock
          </v-icon>
          <v-icon small @click="showFileContent(slotProps.item.id)">
            mdi-eye
          </v-icon>
        </template>
      </FilesTable>
    </v-col>
  </div>
</template>

<script>
import FilesTable from "../../../components/FilesTable.vue";
import { useGroupStore } from "@/store/GroupsStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FilesTable,
  },
  data: () => ({
    selected: [],
  }),
  computed: {
    ...mapState(useGroupStore, ["joinedGroups"]),
  },
  methods: {
    ...mapActions(useGroupStore, ["checkIn", "bulkCheckIn","showFileContent"]),
    showBulkCheckInButton: function () {
      return this.selected.length > 0;
    },
    postBulkCheckIn: function () {
      this.bulkCheckIn(this.selected);
    },
    pushFileHistoryPage: function (id) {
      this.$router.push({ name: "file-history", params: { id: id } });
    },
    itemSelected(item) {
      if (item.value) {
        if (this.selected.indexOf(item.item.id) === -1) {
          this.selected.push(item.item.id);
        }
      } else {
        this.selected.splice(this.selected.indexOf(item.item.id), 1);
      }
    },
    toggleSelectAll(item) {
      if (item.value) {
        item.items.map((selected) => {
          if (this.selected.indexOf(selected.id) === -1) {
            this.selected.push(selected.id);
          }
        });
      } else {
        item.items.map((unSelected) => {
          this.selected.splice(this.selected.indexOf(unSelected.id), 1);
        });
      }
    },
  },
  watch: {
    joinedGroups: {
      immediate: true,
      deep: true,
      handler(newState) {
        this.$nextTick(() => {
          if (newState.message !== "") {
            this.$root.VToast.showMessage(newState);
          }
        });
      },
    },
  },
};
</script>

<style scoped></style>
