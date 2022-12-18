<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title> Edit file </template>
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
      <v-btn color="success" class="text--white" @click="edit()">Upload</v-btn>
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
    fileId: Number,
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
      fileRules: [(v) => !!v || "File is required"],
    };
  },
  methods: {
    ...mapActions(useFileStore, ["editFile"]),
    closeDialog() {
      this.$refs.fileForm.reset();
      this.show = false;
      this.$emit("closed");
    },
    edit() {
      if (this.$refs.fileForm.validate()) {
        this.editFile(this.fileId, this.file.name, this.file);
        this.closeDialog();
      }
    },
  },
};
</script>

<style scoped></style>
