import Client from './clients/AxiosClient';
// const resource = '/groups';

export default {
    getOwnedGroups() {
        return Client.get(`/owned-groups`);
    },
};