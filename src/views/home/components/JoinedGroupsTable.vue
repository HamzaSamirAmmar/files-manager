<template>
  <div style="position: relative">
    <!-- TODO: assign group.id to the key (cannot assign because id is duplicated) -->
    <v-col v-for="(group, index) in joinedGroups.data" :key="index">
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
      >
        <template v-slot:actions="slotProps">
          <v-icon
            small
            class="mr-2"
            @click="pushFileHistoryPage(slotProps.item.id)"
          >
            mdi-history
          </v-icon>
          <v-icon small class="mr-2" @click="postCheckIn(slotProps.item.id)">
            mdi-file-check-outline
          </v-icon>
          <v-icon small @click="test(slotProps)"> mdi-eye </v-icon>
        </template>
      </FilesTable>
    </v-col>
  </div>
</template>

<script>
import FilesTable from "../../../components/FilesTable.vue";
// import CustomLoader from "../../../components/CustomLoader.vue";

import { useFileStore } from "@/store/FilesStore";
import { useGroupStore } from "@/store/GroupsStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FilesTable,
  },
  data: () => ({}),
  computed: {
    ...mapState(useFileStore, ["checkIn"]),
    ...mapState(useGroupStore, ["joinedGroups"]),
  },
  methods: {
    ...mapActions(useFileStore, ["postCheckIn"]),
    pushFileHistoryPage: function (id) {
      this.$router.push({ name: "file-history", params: { id: id } });
    },
    test: function (slotProps) {
      console.log(slotProps);
    },
  },
  watch: {
    checkIn: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.$nextTick(() => {
          if (newValue.message !== "") {
            this.$root.VToast.showMessage(newValue);
          }
        });
      },
    },
  },
};
</script>

<style scoped></style>
