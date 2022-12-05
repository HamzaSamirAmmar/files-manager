import Client from './clients/AxiosClient';

export default {
   getAllMembers(){
      return Client.get(`/all-users`);
   },
   getMembersOfGroup(groupId){
    return Client.get(`/groups/${groupId}/members`);
   }
};