import { defineStore } from "pinia";
import Repository from "../repositories/RepositoryFactory";
import { File } from "@/models/FileModel";

const fileRepository = Repository.get("files");

export const useFileStore = defineStore("fileStore", {
    state: ()=>({
        ownedFiles:[],
        reservedFiles:[],
    }),
    getters:{

    },
    actions:{
        fetchMyFiles(){
            fileRepository.getOwnedFiles()
            .then((response)=>{
                var files=new Array();
                response.data.data.map((file)=>{
                    files.push(new File(file))
                });
                this.ownedFiles=files;
            }).catch((err)=>{ 
                console.log(err);
            });
        },
    }
});