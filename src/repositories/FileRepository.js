import Client from "./clients/AxiosClient";
// const resource = '/files';

export default {
  bulkCheckIn(ids) {
    return Client.get(`/files/bulk-check-in`, {
      files: ids,
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
};
