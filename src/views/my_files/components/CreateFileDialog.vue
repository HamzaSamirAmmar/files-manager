<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title> Add a new file </template>
    <template v-slot:body>
      <v-form ref="uploadFileForm">
        <v-file-input
          v-model="file"
          outlined
          dense
          show-size
          placeholder="File"
          label="Upload your file"
          :rules="[(v) => !!v || 'File is required']"
        >
        </v-file-input>
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
      <v-btn color="success" class="text--white" @click="uploadFile()"
        >Upload</v-btn
      >
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from "./../../../components/FormDialog.vue";
// import { useFileStore } from "@/store/FilesStore";
// import { mapActions, mapState } from "pinia";

export default {
  components: {
    FormDialog,
  },
  props: {
    showCondition: Boolean,
  },

  watch: {
    showCondition: {
      immediate: true,
      handler() {
        this.show = this.showCondition;
      },
    },
  },
  data() {
    return {
      file: [],
      show: this.showCondition,
    };
  },
  methods: {
    closeDialog() {
      this.show = false;
      this.$emit("closed");
    },
    uploadFile() {
      this.$refs.uploadFileForm.validate();
      console.log(this.file);
    },
  },
};
</script>

<style scoped></style>
