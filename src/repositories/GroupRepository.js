import Client from "./clients/AxiosClient";
// const resource = '/groups';

export default {
  getJoinedGroups() {
    return Client.get(`/joined-groups`);
  },
  getOwnedGroups() {
    return Client.get(`/owned-groups`);
  },
  deleteOwnedGroup(id) {
    return Client.delete(`/groups/${id}`);
  },
  createNewGroup(data) {
    return Client.post("/group", data);
  },
  getGroup(id) {
    return Client.get(`/groups/${id}`);
  },
};
