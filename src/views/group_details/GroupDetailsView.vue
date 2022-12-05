<template>
  <div class="grey lighten-5">
    <v-container>
      <v-col>
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="text-h3 pb-2" style="color: #424242;">
          Group : {{ group.name }}
        </div>
        <v-row class="pb-2" no-gutters>
          <div class="text-h6 pl-5" style="color: #757575">
            Group members
          </div>
          <v-spacer></v-spacer>
          <CreateButton entityName="member" @click.native="toggleAddMembersDialog()"></CreateButton>
        </v-row>
        <MembersTable class="ml-5 pb-2"></MembersTable>
        <v-row class="pb-2" no-gutters>
          <div class="text-h6 pl-5" style="color: #757575">
            Group files
          </div>
          <v-spacer></v-spacer>
          <CreateButton entityName="file" @click.native="toggleAddFilesDialog()"></CreateButton>
        </v-row>
        <FilesTable ref="filesTable" :selectable="selectable" class="ml-5 pb-2" fetchFiles="groupFiles" :groupId="group.id">
          <template v-slot:actions="slotProps">
            <v-icon small @click="showDeleteDialog(slotProps.item)">
              mdi-note-remove
            </v-icon>
          </template>
        </FilesTable>
      </v-col>
    </v-container>
    <AddMembersDialog :showCondition="addMembersDialog" @closed="toggleAddMembersDialog()"></AddMembersDialog>
    <AddFilesDialog :showCondition="addFilesDialog" @closed="toggleAddFilesDialog()"></AddFilesDialog>
    <DeleteDialog :showCondition="dialogDelete" @closed="closeDeleteDialog()">
      <template v-slot:title>
        Are you sure you want to remove this file from group?
      </template>
      <template v-slot:actions>
        <v-btn color="blue darken-1" text @click="closeDeleteDialog()">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
      </template>
    </DeleteDialog>
  </div>
</template>

<script>
import CreateButton from './../../components/buttons/CreateButton.vue';
import MembersTable from './components/MembersTable.vue';
import FilesTable from './../../components/FilesTable.vue';
import AddMembersDialog from './components/AddMembersDialog.vue';
import AddFilesDialog from './components/AddFilesDialog.vue';
import DeleteDialog from './../../components/FormDialog.vue';

export default {
  components: {
    CreateButton,                                                                           
    MembersTable,
    FilesTable,
    AddMembersDialog, 
    AddFilesDialog,
    DeleteDialog
  },
  data: () => ({
    selectable:false,
    addMembersDialog: false,
    addFilesDialog: false,
    dialogDelete: false,
    //TODO change it when data is fetched
    loading:false,
    group: {
      id: 1,
      name: 'GroupName',
      files: [],
      members: [],
    },
    editedIndex: -1,
    editedItem: {},
  }),
  computed: {
    links() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'My groups',
          disabled: false,
          href: '/my-groups',
        },
        {
          text: `${this.group.name}`,
          disabled: true,
          href: '#',
        },
      ]
    },
  },
  methods: {
    toggleAddMembersDialog() {
      this.addMembersDialog = !this.addMembersDialog;
    },
    toggleAddFilesDialog() {
      this.addFilesDialog = !this.addFilesDialog;
    },
    showDeleteDialog(item) {
      this.editedIndex = item.order;
      this.editedItem = Object.assign({}, item)
      this.$refs.filesTable.removeFileOfIndex(item.order);
      this.dialogDelete = true;
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.editedIndex= -1
      this.editedItem= {}
    },
    //TODO send delete request (when it's a success remove it from list)
    deleteItemConfirm() {
      //send request
      //call this.closeDeleteDialog
      this.closeDeleteDialog();
    },
  }
}
</script>

<style scoped>

</style>
