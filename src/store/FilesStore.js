import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { File } from "@/models/FileModel";
import { BaseState } from "./BaseState";

const fileRepository = Repository.get("files");

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    ownedFiles: [],
    ownedFilesLoading: true,
    ownedFilesHasError: false,
    ownedFilesError: "",

    checkIn: new BaseState(),

    // checkOutLoading: false,
    // checkOutMessage: "",
    // checkOutError: false,

    reservedFiles: [],
    file: {},
  }),
  getters: {},
  actions: {
    postCheckIn(id) {
      this.checkIn.toggleLoading(true);
      fileRepository
        .checkIn(id)
        .then((response) => {
          console.log(response.data);
          this.checkIn.toggleLoading(false);
          this.checkIn.showMessage("File checked successfully :)", false);
          // TODO change reserver name in the files table
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          this.checkIn.toggleLoading(false);
          this.checkIn.showMessage(
            "OOoops something went wrong.. try again later:(",
            true
          ); // TODO: replace the message with error message
        });
    },
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
    deleteOwnedFile(id, index) {
      fileRepository
        .deleteOwnedFile(id)
        .then((response) => {
          console.log(response);
          this.ownedFiles.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
