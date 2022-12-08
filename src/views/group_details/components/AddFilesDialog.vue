<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>
      Add files to this group
    </template>
    <template v-slot:body>
      <v-select
          v-model="selectedFiles"
          :items="ownedFiles"
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
import { useFileStore } from '@/store/FilesStore';
import { useGroupStore } from '@/store/GroupsStore';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    FormDialog
  },
  props: {
    showCondition: Boolean
  },
  computed:{
    ...mapState(useFileStore,['ownedFiles']),
    ...mapState(useGroupStore,['group'])
  },
  mounted(){
    this.fetchMyFiles();
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
      selectedFiles: [],
    }
  },
  methods: {
    ...mapActions(useFileStore,['fetchMyFiles']),
    ...mapActions(useGroupStore,['addFilesToGroup']),
    closeDialog() {
      this.show = false;
      this.$emit('closed');
      this.selectedFiles=[];
    },
    addFiles(){
      //send request
      if(this.selectedFiles.length!=0){
        var groupId=this.$route.params.id;
        this.addFilesToGroup(groupId,this.selectedFiles);
        this.$root.VToast.showSuccessMessage('files added');
        //close dialog
        this.closeDialog();
        this.selectedFiles=[];
      }
    },
  },
};
</script>

<style scoped>

</style>
