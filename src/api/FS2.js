import axios from 'axios';
const API_URL = "http://45.64.126.93:8002"//process.env.API_LMS_SERVICE;

class FS2 {

    async getRecResources(_id, weak_KPs) {
        const url = `${API_URL}/api/rec-resources/${_id}/${weak_KPs}`;
        return axios.get(url);        
    }
};

export default FS2;