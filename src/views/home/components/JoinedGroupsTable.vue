<template>
  <div style="position: relative">
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
      >
        <template v-slot:actions="slotProps">
          <v-icon
            small
            class="mr-2"
            @click="pushFileHistoryPage(slotProps.item.id)"
          >
            mdi-history
          </v-icon>
          <v-icon small class="mr-2" @click="checkIn(slotProps.item.id)">
            mdi-file-check-outline
          </v-icon>
          <!--TODO: handle click on view file-->
          <v-icon small> mdi-eye </v-icon>
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
  data: () => ({}),
  computed: {
    ...mapState(useGroupStore, ["joinedGroups"]),
  },
  methods: {
    ...mapActions(useGroupStore, ["checkIn"]),
    pushFileHistoryPage: function (id) {
      this.$router.push({ name: "file-history", params: { id: id } });
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
