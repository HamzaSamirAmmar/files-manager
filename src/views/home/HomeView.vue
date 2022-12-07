<template>
  <div>
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="text-h3" style="color: #424242">Joined Groups</div>
        <CustomLoader :loading="joinedGroups.loading">
          <template v-slot:default>
            <JoinedGroupsTable />
          </template>
        </CustomLoader>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import JoinedGroupsTable from "./components/JoinedGroupsTable.vue";
import CustomLoader from "../../components/CustomLoader.vue";
import { useGroupStore } from "@/store/GroupsStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    JoinedGroupsTable,
    CustomLoader,
  },
  computed: {
    ...mapState(useGroupStore, ["joinedGroups"]),
  },
  mounted() {
    this.fetchJoinedGroups();
  },
  methods: {
    ...mapActions(useGroupStore, ["fetchJoinedGroups"]),
  },
  data: () => ({
    links: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
    ],
  }),
};
</script>

<style scoped></style>
