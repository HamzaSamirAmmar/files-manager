<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>
      Add files to this group
    </template>
    <template v-slot:body>
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
      <v-btn color="success" class="text--white"  @click="addFiles()">Add</v-btn>
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
      //TODO fetch owned files 
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
      selectedFiles: [],
    }
  },
  methods: {
    closeDialog() {
      this.show = false;
      this.$emit('closed');
      this.selectedFiles=[];
    },
    //TODO send create request
    addFiles(){
      //send request

      //close dialog
      this.closeDialog();
    },
  },
};
</script>

<style scoped>

</style>
