import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { FileLog } from "@/models/FileLogModel";
const fileRepository = Repository.get("filelogs");


export const useFileLogStore = defineStore("filesLogtore", {
    state: ()=>({
        fileLogs:[],
        loading:true,
        hasError:false,
        error:'',
    }),
    getters:{

    },
    actions:{
        fetchFileLogs(id){
            fileRepository.getLogsOfFile(id)
            .then((response) => {
                var logs = new Array();
                response.data.data.map((log) => {
                    logs.push(new FileLog(log))
                });
                this.fileLogs = logs;
                this.loading = false;
            })
            .catch((err) => {
                this.hasError= true;
                this.error = err.response.data.message;
            });
        }
    }
});