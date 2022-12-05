import Client from './clients/AxiosClient';

export default {
   getMembersOfGroup(groupId){
    return Client.get(`/groups/${groupId}/members`);
   }
};