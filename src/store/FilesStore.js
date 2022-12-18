import { defineStore } from "pinia";
import Repository from "@/repositories/RepositoryFactory";
import { File } from "@/models/FileModel";
import { BaseState } from "./BaseState";

const fileRepository = Repository.get("files");

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    ownedFiles: new BaseState(),
    reservedFiles: new BaseState(),
    file: new BaseState(),
  }),
  getters: {},
  actions: {
    checkOut(id) {
      this.reservedFiles.loading = true;
      fileRepository
        .checkOut(id)
        .then(() => {
          this.reservedFiles.data.splice(
            this.reservedFiles.data.findIndex((file) => file.id === id),
            1
          );
          this.reservedFiles.loading = false;
          this.reservedFiles.message = "File Checked out successfully :)";
        })
        .catch((err) => {
          this.reservedFiles.loading = false;
          this.reservedFiles.error = true;
          this.reservedFiles.message = err.response.data.message;
        });
    },
    editFile(id, name, file) {
      this.reservedFiles.loading = true;
      fileRepository
        .editFile(id, name, file)
        .then((response) => {
          console.log(response);
          this.reservedFiles.loading = false;
          this.reservedFiles.message = "File updated successfully :)";
          this.fetchReservedFiles();
        })
        .catch((err) => {
          this.reservedFiles.loading = false;
          this.reservedFiles.error = true;
          this.reservedFiles.message = err.response.data.message;
        });
    },
    uploadFile(name, file) {
      this.ownedFiles.loading = true;
      fileRepository
        .uploadFile(name, file)
        .then((response) => {
          console.log(response);
          this.ownedFiles.loading = false;
          this.ownedFiles.message = "File uploaded successfully :)";
          this.fetchMyFiles();
        })
        .catch((err) => {
          this.ownedFiles.loading = false;
          this.ownedFiles.error = true;
          this.ownedFiles.message = err.response.data.message;
        });
    },
    fetchReservedFiles() {
      this.reservedFiles.loading = true;
      fileRepository
        .getReservedFiles()
        .then((response) => {
          var files = new Array();
          response.data.data.map((file) => {
            files.push(new File(file));
          });
          this.reservedFiles.data = files;
          this.reservedFiles.loading = false;
        })
        .catch((err) => {
          this.reservedFiles.loading = false;
          this.reservedFiles.error = true;
          this.reservedFiles.message = err.response.data.message;
        });
    },
    fetchMyFiles() {
      this.ownedFiles.loading = true;
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
          this.ownedFiles.error = true;
          this.ownedFiles.message = err.response.data.message;
        });
    },
    fetchFile(id) {
      this.file.loading = true;
      fileRepository
        .getFileById(id)
        .then((response) => {
          this.file.data = new File(response.data.data);
          this.file.loading = false;
        })
        .catch((err) => {
          this.file.loading = false;
          this.file.error = true;
          this.file.message = err.response.data.message;
        });
    },
    deleteOwnedFile(id) {
      this.ownedFiles.loading = true;
      fileRepository
        .deleteOwnedFile(id)
        .then(() => {
          this.ownedFiles.loading = false;
          this.ownedFiles.data.splice(
            this.ownedFiles.data.findIndex((file) => file.id === id),
            1
          );
        })
        .catch((err) => {
          this.ownedFiles.loading = false;
          this.ownedFiles.error = true;
          this.ownedFiles.message = err.response.data.message;
        });
    },
  },
});
