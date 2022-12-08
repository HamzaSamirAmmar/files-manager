import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { Group } from "@/models/GroupModel";
import { File } from "@/models/FileModel";
import { BaseState } from "./BaseState";

const groupRepository = Repository.get("groups");
const fileRepository = Repository.get("files");

export const useGroupStore = defineStore("groupStore", {
  state: () => ({
    ownedGroups: [],
    ownedGroupsLoading: true,
    ownedGroupsHasError: false,
    ownedGroupsError: "",

    joinedGroups: new BaseState(),

    group: {},
    groupLoading: true,
    groupHasError: false,
    groupError: "",
  }),
  getters: {},
  actions: {
    checkIn(id, groupId) {
      this.joinedGroups.loading = true;
      fileRepository
        .checkIn(id)
        .then((response) => {
          console.log(response);
          this.joinedGroups.loading = false;
          this.joinedGroups.message = "File checked successfully :)";
          // TODO change reserver name in the files table (get name of current user) 
          // use group id to find the group and id to find the file
          console.log(groupId);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          this.joinedGroups.loading = false;
          this.joinedGroups.error = true;
          this.joinedGroups.message = err.response.data.message;
        });
    },
    fetchJoinedGroups() {
      this.joinedGroups.loading = true;
      groupRepository
        .getJoinedGroups()
        .then((response) => {
          this.joinedGroups.loading = false;
          var groups = new Array();
          response.data.data.map((group) => {
            groups.push(new Group(group));
          });
          this.joinedGroups.data = groups;
        })
        .catch((error) => {
          this.joinedGroups.loading = false;
          this.joinedGroups.error = true;
          this.joinedGroups.message =
            error.response.data.message || "Something went wrong";
        });
    },
    fetchOwnedGroups() {
      groupRepository
        .getOwnedGroups()
        .then((response) => {
          var groups = new Array();
          response.data.map((group) => {
            groups.push(new Group(group));
          });
          this.ownedGroups = groups;
          this.ownedGroupsLoading = false;
        })
        .catch((err) => {
          this.ownedGroupsHasError = true;
          this.ownedGroupsError = err.response.data.message;
        });
    },
    deleteOwnedGroup(id) {
      groupRepository
        .deleteOwnedGroup(id)
        .then(() => {
          this.ownedGroups.splice(
            this.ownedGroups.findIndex((group) => group.id === id),
            1
          );
        })
        .catch((err) => {
          this.ownedGroupsHasError = true;
          this.ownedGroupsError = err.response.data.message;
        });
    },
    createNewGroup(data) {
      groupRepository
        .createNewGroup(data)
        .then((response) => {
          this.ownedGroups.push(
            new Group({ id: response.data.data.id, name: data.name })
          );
        })
        .catch((err) => {
          this.ownedGroupsHasError = true;
          this.ownedGroupsError = err.response.data.message;
        });
    },
    fetchGroup(id) {
      groupRepository
        .getGroup(id)
        .then((response) => {
          var group = new Group(response.data.data);
          this.group = group;
          this.groupLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.groupHasError = true;
          this.groupError = err.response.data.message;
        });
    },
    addFilesToGroup(groupId, filesIds) {
      fileRepository
        .addFilesToGroup(groupId, filesIds)
        .then((response) => {
          var files = new Array();
          response.data.data.map((file) => {
            files.push(new File(file));
          });
          this.group.files = files;
        })
        .catch((err) => {
          this.groupHasError = true;
          this.groupError = err.response.data.message;
        });
    },
    removeFileFromGroup(groupId, fileId) {
      this.groupLoading = true;
      fileRepository
        .removeFileFromGroup(groupId, fileId)
        .then(() => {
          this.group.files.splice(
            this.group.files.findIndex((file) => file.id === fileId),
            1
          );
          this.groupLoading = false;
        })
        .catch((err) => {
          this.groupHasError = true;
          this.groupError = err.response.data.message;
        });
    },
  },
});
