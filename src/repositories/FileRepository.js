import Client from './clients/AxiosClient';
// const resource = '/files';

export default {
    getOwnedFiles() {
        return Client.get(`/owned-files`);
    },
    getFileById(id){
        return Client.get(`/files/${id}`);
    }
};