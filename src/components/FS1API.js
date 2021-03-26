import axios from 'axios';
const API_URL = 'http://45.64.126.93:8000';

export default class FS1Service{

    constructor(){}

    getRecCourse() {
        const url = `${API_URL}/api/courses/?format=json`;
        return axios.get(url).then(response => response.data);
    }
    
}

//http://45.64.126.93:8000/api/courses/?format=json