import Client from "./clients/AxiosClient";

export default {
  getLogsOfFile(id) {
    return Client.get(`/files/${id}/history`);
  },
};
