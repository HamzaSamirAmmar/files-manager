<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>
      Add members to this group
    </template>
    <template v-slot:body>
      <v-select
          v-model="selectedUsers"
          :items="users"
          label="Select members"
          multiple
          chips
          hint="Who are the members of the group"
          persistent-hint
          item-value="id"
        >
        <template v-slot:item="{item}">
          {{item.name}}
        </template>    
        <template v-slot:selection="{item}">
         <v-chip>{{item.name}}</v-chip> 
        </template>
      </v-select>
    </template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
      <v-btn color="success" class="text--white"  @click="addMembers()">Add</v-btn>
    </template>
  </FormDialog>

</template>

<script>
import FormDialog from './../../../components/FormDialog.vue';
export default {
  components: {
    FormDialog
  },
  props: {
    showCondition: Boolean
  },
  watch: {
    showCondition: {
      immediate: true,
      handler() {
        this.show = this.showCondition
      }
    }
  },
  data() {
    return {
      show: this.showCondition,
      //TODO fetch users 
      users: [
        {
          id: 1,
          name: 'name1',
          email: 'email1'
        },
        {
          id: 2,
          name: 'name2',
          email: 'email2'
        }
      ],
      selectedUsers: [],
    }
  },
  methods: {
    closeDialog() {
      this.show = false;
      this.$emit('closed');
      this.users=[];
    },
    //TODO send create request
    addMembers(){
      //send request

      //close dialog
      this.closeDialog();
    },
  },
};
</script>

<style scoped>

</style>
