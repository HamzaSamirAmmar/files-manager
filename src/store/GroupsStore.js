import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { Group } from "@/models/GroupModel";
import { BaseState } from "./BaseState";

const groupRepository = Repository.get("groups");

export const useGroupStore = defineStore("groupStore", {
  state: () => ({
    ownedGroups: [],
    ownedGroupsLoading: true,
    ownedGroupsHasError: false,
    ownedGroupsError: "",

    joinedGroups: new BaseState(true),
    // joinedGroups: [],
    // joinedGroupsLoading: true,
    // joinedGroupsErrorMessage: "",
    // joinedGroupsHasError: false,

    group: {},
    groupLoading: true,
    groupHasError: false,
    groupError: "",
  }),
  getters: {},
  actions: {
    fetchJoinedGroups() {
      groupRepository
        .getJoinedGroups()
        .then((response) => {
          this.joinedGroups.toggleLoading(false);
          var groups = new Array();
          response.data.data.map((group) => {
            groups.push(new Group(group));
          });
          this.joinedGroups.setData(groups);
        })
        .catch((error) => {
          this.joinedGroups.toggleLoading(false);
          this.joinedGroups.showMessage(
            error.response.data.message || "Something went wrong",
            true
          );
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
  },
});
