import { defineStore } from "pinia";
import Repository from "../repositories/RepositoryFactory";
import { Member } from "@/models/MemberModel";

const membersRepository = Repository.get("members");

export const useMemberStore = defineStore("memberStore", {
    state: ()=>({
        groupMembers:[],
        allMembers:[],
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
            }).catch((err)=>{ 
                console.log(err);
            });
        }
    }
});