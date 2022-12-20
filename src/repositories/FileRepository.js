import Client from "./clients/AxiosClient";
// const resource = '/files';

export default {
  bulkCheckIn(ids) {
    console.log(ids);
    return Client.post(`/files/bulk-check-in?_method=PUT`, {
      ids: ids,
    });
  },
  getOwnedFiles() {
    return Client.get(`/owned-files`);
  },
  getFileById(id) {
    return Client.get(`/files/${id}`);
  },
  getReservedFiles() {
    return Client.get(`/files/checked-in`);
  },
  addFilesToGroup(groupId, filesIds) {
    var data = { filesIds: filesIds };
    return Client.post(`/groups/${groupId}/add-files`, data);
  },
  removeFileFromGroup(groupId, fileId) {
    return Client.delete(`/groups/${groupId}/files/${fileId}`);
  },
  checkIn(id) {
    return Client.put(`/files/${id}/check-in`);
  },
  checkOut(id) {
    return Client.put(`/files/${id}/check-out`);
  },
  deleteOwnedFile(id) {
    return Client.delete(`/files/${id}`);
  },
  showFileContent(id) {
    return Client.get(`/files/${id}/content`, {
      responseType: "blob",
    });
  },
  uploadFile(name, file) {
    return Client.post(
      `/file`,
      {
        name: name,
        file: file,
      },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  },
  editFile(id, name, file) {
    return Client.post(
      `/files/${id}/edit-file?_method=PUT`,
      {
        name: name,
        file: file,
      },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  },
};
