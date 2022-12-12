import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { File } from "@/models/FileModel";
import { BaseState } from "./BaseState";

const fileRepository = Repository.get("files");

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    ownedFiles: new BaseState(),
    reservedFiles: new BaseState(),
    file:new BaseState(),
  }),
  getters: {},
  actions: {
    fetchMyFiles() {
      this.ownedFiles.loading=true;
      fileRepository
        .getOwnedFiles()
        .then((response) => {
          var files = new Array();
          response.data.data.map((file) => {
            files.push(new File(file));
          });
          this.ownedFiles.data = files;
          this.ownedFiles.loading = false;
        })
        .catch((err) => {
          this.ownedFiles.loading = false;
          this.ownedFiles.error=true;
          this.ownedFiles.message=err.response.data.message;
        });
    },
    fetchFile(id) {
      this.file.loading=true;
      fileRepository
        .getFileById(id)
        .then((response) => {
          this.file.data = new File(response.data.data);
          this.file.loading=false;
        })
        .catch((err) => {
          this.file.loading=false;
          this.file.error=true;
          this.file.message=err.response.data.message;
        });
    },
    deleteOwnedFile(id) {
      this.ownedFilesLoading = true;//FIXME now it's using baseState
      fileRepository
        .deleteOwnedFile(id)
        .then((response) => {
          this.ownedFilesLoading = false;
          console.log(response);
          this.ownedFiles.splice(
            this.ownedFiles.indexOf((file) => file.id == id),
            1
          );
        })
        .catch((err) => {
          this.ownedFilesLoading = false;
          console.log(err);
        });
    },
  },
});
