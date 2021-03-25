import axios from 'axios';
const API_URL = 'http://45.64.126.93:8000';

class LMSService {

    async getKP() {
        const url = `${API_URL}/api/KPs-nested/`;
        return axios.get(url);//.then(response => response.data);
    }

    async getKPSubset(parent_KP) {
        const url = `${API_URL}/api/KPs/${parent_KP}/subset`;
        return axios.get(url, {
        });//.then(response => response.data);
    }
};

export default LMSService;
// const obj = new LMSService();
// obj.getKPSubset('1').then(function (result) {
//     console.log(result.data);
// });