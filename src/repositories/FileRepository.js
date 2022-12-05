import Client from './clients/AxiosClient';
const resource = '/files';

export default {
    getOwnedFiles() {
        return Client.get(`${resource}`);
    },
};