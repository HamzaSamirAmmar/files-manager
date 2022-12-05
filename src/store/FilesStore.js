import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", {
    state: ()=>({
        ownedFiles:[],
        reservedFiles:[],
    }),
    getters:{

    },
    actions:{

    }
});