import axios from 'axios';
const API_URL = 'http://45.64.126.93:8000';

export default class djangoService{

    constructor(){}

    getKP() {
        const url = `${API_URL}/api/KPs/`;
        return axios.get(url).then(response => response.data);
    }
}