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
          <div class="text-h3" style="color: #424242;">
            My groups
          </div>
          <v-spacer></v-spacer>
          <CreateButton entityName="group" @click.native="showCreateDialog()"></CreateButton>
        </v-row>
        <GroupsTable></GroupsTable>
      </v-col>
    </v-container>
    <CreateGroupDialog :showCondition="showDialog" @closed="closeCreateDialog()"></CreateGroupDialog>
  </div>
</template>

<script>
import CreateButton from './../../components/buttons/CreateButton.vue';
import GroupsTable from './components/GroupsTable.vue';
import CreateGroupDialog from './components/CreateGroupDialog.vue';

export default {
  components: {
    CreateButton,
    GroupsTable,
    CreateGroupDialog
  },
  data: () => ({
    showDialog: false,
    links: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'My groups',
        disabled: true,
        href: '#',
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
  }
}
</script>

<style scoped>

</style>
