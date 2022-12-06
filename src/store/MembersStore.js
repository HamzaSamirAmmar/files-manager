import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { Member } from "@/models/MemberModel";

const membersRepository = Repository.get("members");

export const useMemberStore = defineStore("memberStore", {
    state: ()=>({
        groupMembers:[],
        allMembers:[],
        loading:true,
        hasError:false,
        error:'',
    }),
    getters:{

    },
    actions:{
        fetchAllMembers(){
            membersRepository.getAllMembers()
            .then((response)=>{
                var members=new Array();
                response.data.data.map((member)=>{
                    members.push(new Member(member))
                });
                this.allMembers=members;
                this.loading=false;
            }).catch((err)=>{ 
                this.hasError=true;
                this.error=err.response.data.message;
            });
        },
        fetchGroupMembers(groupId){
            membersRepository.getMembersOfGroup(groupId)
            .then((response)=>{
                var members=new Array();
                response.data.data.map((member)=>{
                    members.push(new Member(member))
                });
                this.groupMembers=members;
                this.loading=false;
            }).catch((err)=>{ 
                this.hasError=true;
                this.error=err.response.data.message;
            });
        },
        addMembersToGroup(groupId,memberIds){
            membersRepository.addMembersToGroup(groupId,memberIds)
            .then((response)=>{
                var members=new Array();
                response.data.data.map((member)=>{
                    members.push(new Member(member))
                });
                this.groupMembers=members;
                this.loading=false;
            }).catch((err)=>{ 
                this.hasError=true;
                this.error=err.response.data.message;
            });
        },
        removeMemberFromGroup(groupId,memberId){
            membersRepository.removeMemberFromGroup(groupId,memberId)
            .then(()=>{
                this.groupMembers.splice(this.groupMembers.findIndex(member => member.id===memberId),1)
                this.loading=false;
            }).catch((err)=>{ 
                this.hasError=true;
                this.error=err.response.data.message;
            });
        },
    }
});