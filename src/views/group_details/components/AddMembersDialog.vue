<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>
      Add members to this group
    </template>
    <template v-slot:body>
      <v-select v-model="selectedUsers" :items="allMembers" label="Select members" multiple chips
        hint="Who are the members of the group" persistent-hint item-value="id">
        <template v-slot:item="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:selection="{ item }">
          <v-chip>{{ item.name }}</v-chip>
        </template>
      </v-select>
    </template>
    <template v-slot:actions>
        <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
        <v-btn color="success" class="text--white" @click="addMembers()">Add</v-btn>
  </template>
  </FormDialog>

</template>

<script>
import FormDialog from './../../../components/FormDialog.vue';
import { useMemberStore } from '@/store/MembersStore';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    FormDialog,
  },
  props: {
    showCondition: Boolean
  },
  mounted() {
    this.fetchAllMembers()
  },
  computed: {
    ...mapState(useMemberStore, ['allMembers'])
  },
  watch: {
    showCondition: {
      immediate: true,
      handler() {
        this.show = this.showCondition
      }
    },
  },
  data() {
    return {
      show: this.showCondition,
      selectedUsers: [],
    }
  },
  methods: {
    ...mapActions(useMemberStore, ['fetchAllMembers','addMembersToGroup']),
    closeDialog() {
      this.show = false;
      this.$emit('closed');
      this.users = [];
    },
    addMembers() {
      //send request
      if(this.selectedUsers.length!=0){
        var groupId=this.$route.params.id;
        this.addMembersToGroup(groupId,this.selectedUsers);
        //close dialog
        this.closeDialog();
        this.selectedUsers=[];
      }

    },
  },
};
</script>

<style scoped>

</style>
