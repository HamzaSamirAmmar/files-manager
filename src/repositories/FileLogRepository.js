import Client from './clients/AxiosClient';

export default {
    getLogsOfFile(id) {
        return Client.get(`/files/${id}/history`)
            .then(({ data }) => {
                // var filelogs=new Array();
                return Promise.resolve(data)
            })
            .catch((err) => {
                return Promise.reject(err)
            });
    },
};