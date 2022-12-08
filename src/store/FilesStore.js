import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { File } from "@/models/FileModel";

const fileRepository = Repository.get("files");

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    ownedFiles: [],
    ownedFilesLoading: true,
    ownedFilesHasError: false,
    ownedFilesError: "",
    reservedFiles: [],
    file: {},
  }),
  getters: {},
  actions: {
    fetchMyFiles() {
      fileRepository
        .getOwnedFiles()
        .then((response) => {
          var files = new Array();
          response.data.data.map((file) => {
            files.push(new File(file));
          });
          this.ownedFiles = files;
          this.ownedFilesLoading = false;
        })
        .catch((err) => {
          this.ownedFilesHasError = true;
          this.ownedFilesError = err.response.data.message;
          console.log(err);
        });
    },
    fetchFile(id) {
      fileRepository
        .getFileById(id)
        .then((response) => {
          this.file = new File(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteOwnedFile(id) {
      this.ownedFilesLoading = true;
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
