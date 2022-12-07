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
    <CustomLoader :loading="loading">
        <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
        <v-btn color="success" class="text--white" @click="addMembers()">Add</v-btn>
    </CustomLoader>
  </template>
  </FormDialog>

</template>

<script>
import FormDialog from './../../../components/FormDialog.vue';
import CustomLoader from './../../../components/CustomLoader.vue';
import { useMemberStore } from '@/store/MembersStore';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    FormDialog,
    CustomLoader,
  },
  props: {
    showCondition: Boolean
  },
  mounted() {
    this.fetchAllMembers()
  },
  computed: {
    ...mapState(useMemberStore, ['allMembers', 'loading', 'hasError', 'error'])
  },
  watch: {
    showCondition: {
      immediate: true,
      handler() {
        this.show = this.showCondition
      }
    },
    hasError: {
            immediate: true,
            handler(newValue) {
                this.$nextTick(() => {
                    if(newValue){
                        this.$root.VToast.showErrorMessage(this.error);         
                    }
                })
            }
        }
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
        if(!this.hasError){
          this.$root.VToast.showSuccessMessage('members added');
        }
        this.selectedUsers=[];
      }

    },
  },
};
</script>

<style scoped>

</style>
