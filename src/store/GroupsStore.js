import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { Group } from "@/models/GroupModel";
import { File } from "@/models/FileModel";
import { BaseState } from "./BaseState";

const groupRepository = Repository.get("groups");
const fileRepository = Repository.get("files");

export const useGroupStore = defineStore("groupStore", {
  state: () => ({
    ownedGroups: new BaseState(),
    joinedGroups: new BaseState(),
    group: new BaseState(),
  }),
  getters: {},
  actions: {
    showFileContent(id) {
      this.joinedGroups.loading = true;
      fileRepository
        .showFileContent(id)
        .then((response) => {
          // create file link in browser's memory
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf");
          document.body.appendChild(link);
          link.click();
          this.joinedGroups.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.joinedGroups.loading = false;
          this.joinedGroups.error = true;
          // temporary solution
          this.joinedGroups.message =
            err.message !== "Network Error"
              ? "This action is unauthorized"
              : "";
          // ************************** //
        });
    },
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
    bulkCheckIn(ids) {
      this.joinedGroups.loading = true;
      fileRepository
        .bulkCheckIn(ids)
        .then(() => {
          this.joinedGroups.loading = false;
          this.joinedGroups.message = "Files checked successfully :)";
        })
        .catch((err) => {
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
      this.ownedGroups.loading = true;
      groupRepository
        .getOwnedGroups()
        .then((response) => {
          var groups = new Array();
          response.data.map((group) => {
            groups.push(new Group(group));
          });
          this.ownedGroups.data = groups;
          this.ownedGroups.loading = false;
        })
        .catch((error) => {
          this.ownedGroups.loading = false;
          this.ownedGroups.error = true;
          this.ownedGroups.message =
            error.response.data.message || "Something went wrong";
        });
    },
    deleteOwnedGroup(id) {
      this.ownedGroups.loading = true;
      groupRepository
        .deleteOwnedGroup(id)
        .then(() => {
          this.ownedGroups.data.splice(
            this.ownedGroups.data.findIndex((group) => group.id === id),
            1
          );
          this.ownedGroups.loading = false;
          this.ownedGroups.message = "group deleted successfully :)";
        })
        .catch((error) => {
          this.ownedGroups.loading = false;
          this.ownedGroups.error = true;
          this.ownedGroups.message =
            error.response.data.message || "Something went wrong";
        });
    },
    createNewGroup(data) {
      this.ownedGroups.loading = true;
      groupRepository
        .createNewGroup(data)
        .then((response) => {
          this.ownedGroups.data.push(
            new Group({ id: response.data.data.id, name: data.name })
          );
          this.ownedGroups.loading = false;
          this.ownedGroups.message = "group created successfully :)";
        })
        .catch((error) => {
          this.ownedGroups.loading = false;
          this.ownedGroups.error = true;
          this.ownedGroups.message =
            error.response.data.message || "Something went wrong";
        });
    },
    fetchGroup(id) {
      this.group.loading = true;
      groupRepository
        .getGroup(id)
        .then((response) => {
          var group = new Group(response.data.data);
          this.group.data = group;
          this.group.loading = false;
        })
        .catch((error) => {
          this.group.loading = false;
          this.group.error = true;
          this.group.message =
            error.response.data.message || "Something went wrong";
        });
    },
    addFilesToGroup(groupId, filesIds) {
      this.group.loading = true;
      fileRepository
        .addFilesToGroup(groupId, filesIds)
        .then((response) => {
          var files = new Array();
          response.data.data.map((file) => {
            files.push(new File(file));
          });
          this.group.data.files = files;
          this.group.loading = false;
          this.group.message = "files added successfully :)";
        })
        .catch((error) => {
          this.group.loading = false;
          this.group.error = true;
          this.group.message =
            error.response.data.message || "Something went wrong";
        });
    },
    removeFileFromGroup(groupId, fileId) {
      this.group.loading = true;
      fileRepository
        .removeFileFromGroup(groupId, fileId)
        .then(() => {
          this.group.data.files.splice(
            this.group.data.files.findIndex((file) => file.id === fileId),
            1
          );
          this.group.loading = false;
          this.group.message = "file removed";
        })
        .catch((error) => {
          this.group.loading = false;
          this.group.error = true;
          this.group.message =
            error.response.data.message || "Something went wrong";
        });
    },
  },
});
