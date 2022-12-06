<template>
  <FormDialog :showCondition="show" @closed="closeDialog()">
    <template v-slot:title> Create a new Group </template>
    <template v-slot:body>
      <v-form ref="createGroupForm">
        <v-text-field
          v-model="name"
          label="Group name"
          :rules="nameRules"
        ></v-text-field>
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
          <template v-slot:item="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:selection="{ item }">
            <v-chip>{{ item.name }}</v-chip>
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
          <template v-slot:item="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:selection="{ item }">
            <v-chip>{{ item.name }}</v-chip>
          </template>
        </v-select>
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn color="blue darken-1" text @click="closeDialog()">Cancel</v-btn>
      <v-btn color="success" class="text--white" @click="createGroup()"
        >create</v-btn
      >
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from "./../../../components/FormDialog.vue";
import { useMemberStore } from "@/store/MembersStore";
import { useFileStore } from "@/store/FilesStore";
import { useGroupStore } from "@/store/GroupsStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    FormDialog,
  },
  props: {
    showCondition: Boolean,
  },
  computed: {
    ...mapState(useMemberStore, { users: "allMembers" }),
    ...mapState(useFileStore, { myFiles: "ownedFiles" }),
  },
  mounted() {
    this.fetchAllMembers();
    this.fetchMyFiles();
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
      name: "",
      show: this.showCondition,
      nameRules: [(v) => !!v || "Name is required"],
      selectedUsers: [],
      selectedFiles: [],
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["fetchAllMembers"]),
    ...mapActions(useFileStore, ["fetchMyFiles"]),
    ...mapActions(useGroupStore, ["createNewGroup"]),
    closeDialog() {
      this.show = false;
      this.$emit("closed");
      this.selectedUsers = [];
      this.selectedFiles = [];
    },
    //TODO send create request
    createGroup() {
      //validate
      if (this.$refs.createGroupForm.validate()) {
        var data = {
          name: this.name,
          users: this.selectedUsers,
          fileIds: this.selectedFiles,
        };
        this.createNewGroup(data);
        this.$root.VToast.showSuccessMessage("group created");
      }
      //call this.closeDialog
      this.closeDialog();
    },
  },
};
</script>

<style scoped></style>
