import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { Member } from "@/models/MemberModel";
import { BaseState } from "./BaseState";

const membersRepository = Repository.get("members");

export const useMemberStore = defineStore("memberStore", {
  state: () => ({
    groupMembers: new BaseState(),
    allMembers: []
  }),
  getters: {},
  actions: {
    fetchAllMembers() {
      membersRepository
        .getAllMembers()
        .then(response => {
          var members = new Array();
          response.data.data.map(member => {
            members.push(new Member(member));
          });
          this.allMembers = members;
        })
        .catch(err => {
        console.log(err);
        });
    },
    fetchGroupMembers(groupId) {
      this.groupMembers.loading = true;
      membersRepository
        .getMembersOfGroup(groupId)
        .then(response => {
          var members = new Array();
          response.data.data.map(member => {
            members.push(new Member(member));
          });
          this.groupMembers.data = members;
          this.groupMembers.loading = false;
        })
        .catch(error => {
          this.groupMembers.error = true;
          this.groupMembers.loading = false;
          this.groupMembers.message = error.response.data.message;
        });
    },
    addMembersToGroup(groupId, memberIds) {
      this.groupMembers.loading = true;
      membersRepository
        .addMembersToGroup(groupId, memberIds)
        .then(response => {
          var members = new Array();
          response.data.data.map(member => {
            members.push(new Member(member));
          });
          this.groupMembers.data = members;
          this.groupMembers.loading = false;
          this.groupMembers.message = "members added successfully :)";
        })
        .catch(error => {
            this.groupMembers.error = true;
            this.groupMembers.loading = false;
            this.groupMembers.message = error.response.data.message;
        });
    },
    removeMemberFromGroup(groupId, memberId) {
    this.groupMembers.loading = true;
      membersRepository
        .removeMemberFromGroup(groupId, memberId)
        .then(() => {
          this.groupMembers.data.splice(
            this.groupMembers.data.findIndex(member => member.id === memberId),
            1
          );
          this.groupMembers.loading = false;
          this.groupMembers.message = "member removed";
        })
        .catch(err => {
          this.groupMembers.error = true;
          this.groupMembers.loading = false;
          this.groupMembers.message = err.response.data.message;
        });
    }
  }
});
