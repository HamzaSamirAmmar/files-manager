import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { FileLog } from "@/models/FileLogModel";
import { BaseState } from "./BaseState";
const fileRepository = Repository.get("filelogs");


export const useFileLogStore = defineStore("filesLogtore", {
    state: ()=>({
        fileLogs:new BaseState(),
    }),
    getters:{

    },
    actions:{
        fetchFileLogs(id){
            this.fileLogs.loading=true;
            fileRepository.getLogsOfFile(id)
            .then((response) => {
                var logs = new Array();
                response.data.data.map((log) => {
                    logs.push(new FileLog(log))
                });
                this.fileLogs.data = logs;
                this.fileLogs.loading = false;
            })
            .catch((error) => {
                this.fileLogs.error= true;
                this.fileLogs.message = error.response.data.message;
            });
        }
    }
});