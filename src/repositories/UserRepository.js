import Client from './clients/AxiosClient';

export default {
    getUserById(id) {
        return Client.get(`/user/${id}`)
    }
};