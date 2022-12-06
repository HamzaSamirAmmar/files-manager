import Client from './clients/AxiosClient';

export default {
   getAllMembers(){
      return Client.get(`/all-users`);
   },
   getMembersOfGroup(groupId){
    return Client.get(`/groups/${groupId}/members`);
   },
   addMembersToGroup(groupId,memberIds){
      var data={users:memberIds}
      return Client.post(`/groups/${groupId}/add-users`,data);
   },
   removeMemberFromGroup(groupId,memberId){
      return Client.delete(`/groups/${groupId}/users/${memberId}`)
   },
};