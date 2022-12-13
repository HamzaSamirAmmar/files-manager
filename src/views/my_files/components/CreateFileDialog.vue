<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title> Add a new file </template>
    <template v-slot:body>
      <v-form ref="fileForm">
        <v-file-input
          v-model="file"
          outlined
          dense
          show-size
          placeholder="File"
          label="Upload your file"
          :rules="fileRules"
        >
        </v-file-input>
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
      <v-btn color="success" class="text--white" @click="upload()"
        >Upload</v-btn
      >
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from "./../../../components/FormDialog.vue";
import { useFileStore } from "@/store/FilesStore";
import { mapActions } from "pinia";

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
      fileRules: [
        (v) => !!v || "File is required",
      ],
    };
  },
  methods: {
    ...mapActions(useFileStore, ["uploadFile"]),
    closeDialog() {
      this.$refs.fileForm.reset();
      this.show = false;
      this.$emit("closed");
    },
    upload() {
      if (this.$refs.fileForm.validate()) {
        this.uploadFile(this.file.name, this.file);
        this.closeDialog();
      }
    },
  },
};
</script>

<style scoped></style>
