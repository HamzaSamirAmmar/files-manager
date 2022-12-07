import Client from "./clients/AxiosClient";
// const resource = '/files';

export default {
  getOwnedFiles() {
    return Client.get(`/owned-files`);
  },
  getFileById(id) {
    return Client.get(`/files/${id}`);
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
};
