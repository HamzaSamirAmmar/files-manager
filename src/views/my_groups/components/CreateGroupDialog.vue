<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>
      Create a new Group
    </template>
    <template v-slot:body>
      <v-text-field label="Group name"></v-text-field>
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
      <v-select
          v-model="selectedFiles"
          :items="myFiles"
          label="Select files"
          multiple
          chips
          hint="What files of yours you want to add to this group"
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
      <v-btn color="success" class="text--white"  @click="createGroup()">create</v-btn>
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
      //TODO fetch users and files
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
      myFiles: [
        {
          id: 1,
          name: 'file1',
        },
        {
          id: 2,
          name: 'file2',
        },
      ],
      selectedUsers: [],
      selectedFiles: [],
    }
  },
  methods: {
    closeDialog() {
      this.show = false;
      this.$emit('closed');
      this.editedIndex= -1
      this.editedItem= {}
    },
    //TODO send create request
    createGroup(){
      //send request
      //call this.closeDialog
      this.closeDialog();
    },
  },
};
</script>

<style scoped>

</style>
