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
        <GroupFilesTable></GroupFilesTable>
      </v-col>
    </v-container>
    <AddMembersDialog :showCondition="addMembersDialog" @closed="toggleAddMembersDialog()"></AddMembersDialog>
    <AddFilesDialog :showCondition="addFilesDialog" @closed="toggleAddFilesDialog()"></AddFilesDialog>
  </div>
</template>

<script>
import CreateButton from './../../components/buttons/CreateButton.vue';
import MembersTable from './components/MembersTable.vue';
import GroupFilesTable from './components/GroupFilesTable.vue';
import AddMembersDialog from './components/AddMembersDialog.vue';
import AddFilesDialog from './components/AddFilesDialog.vue';
import { useGroupStore } from '@/store/GroupsStore';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    CreateButton,                                                                           
    MembersTable,
    GroupFilesTable,
    AddMembersDialog, 
    AddFilesDialog,
  },
  mounted(){
    this.fetchGroup(this.$route.params.id);
  },
  data: () => ({
    addMembersDialog: false,
    addFilesDialog: false,
  }),
  computed: {
    ...mapState(useGroupStore,['group','groupHasError','groupError']),
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
  watch: {
    groupHasError: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.$nextTick(() => {
                    if(newValue){
                        this.$root.VToast.showErrorMessage(this.groupError);         
                    }
                })
            }
        }
    },
  methods: {
    toggleAddMembersDialog() {
      this.addMembersDialog = !this.addMembersDialog;
    },
    toggleAddFilesDialog() {
      this.addFilesDialog = !this.addFilesDialog;
    },
    ...mapActions(useGroupStore,['fetchGroup']),
  }
}
</script>

<style scoped>

</style>
