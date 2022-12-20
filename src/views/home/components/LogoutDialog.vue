<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title>Are you sure you want to logout?</template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" text @click="closeDialog()">No</v-btn>
      <v-btn color="error" class="text--white" @click="logout()">Yes</v-btn>
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from "./../../../components/FormDialog.vue";
// import { useFileStore } from "@/store/FilesStore";
// import { mapActions } from "pinia";

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
    return {};
  },
  methods: {
    logout: function () {},
    closeDialog() {
      this.show = false;
      this.$emit("closed");
    },
  },
};
</script>

<style scoped></style>
