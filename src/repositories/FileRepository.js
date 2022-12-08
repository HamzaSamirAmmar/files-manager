import Client from './clients/AxiosClient';
// const resource = '/files';

export default {
    getOwnedFiles() {
        return Client.get(`/owned-files`);
    },
    getFileById(id){
        return Client.get(`/files/${id}`);
    },
    addFilesToGroup(groupId,filesIds){
        var data={filesIds:filesIds}
        return Client.post(`/groups/${groupId}/add-files`,data);
     },
     removeFileFromGroup(groupId,fileId){
        return Client.delete(`/groups/${groupId}/files/${fileId}`)
     },
};