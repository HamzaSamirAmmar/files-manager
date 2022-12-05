import { defineStore } from "pinia";
import Repository from "../repositories/RepositoryFactroy";
import { Group } from "@/models/GroupModel";

const groupRepository = Repository.get("groups");


export const useGroupStore = defineStore("groupStore", {
    state: ()=>({
        ownedGroups:[],
        ownedGroupsLoading:true,
        ownedGroupsHasError:false,
        ownedGroupsError:'',

        joinedGroups:[],
        groupOfId:{},
    }),
    getters:{

    },
    actions:{
         fetchOwnedGroups(){
            groupRepository.getOwnedGroups()
            .then((response) => {
                var groups=new Array();
                response.data.map((group)=>{
                    groups.push(new Group(group))
                });
                this.ownedGroups=groups;
                this.ownedGroupsLoading=false;
            })
            .catch((err) => {
                this.ownedGroupsHasError=true;
                this.ownedGroupsError=err.response.data.message;
            });
        },
    }
});