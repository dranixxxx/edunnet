import axios from 'axios';
const API_URL = "http://45.64.126.93:8000"//process.env.API_LMS_SERVICE;

export default class LMSService {

    getAllKPs() {
        const url = `${API_URL}/api/KPs/`;
        return axios.get(url);
    }

    getKP() {
        const url = `${API_URL}/api/KPs-nested/`;
        return axios.get(url);//.then(response => response.data);
    }

    getKPSubset(parent_KP) {
        const url = `${API_URL}/api/KPs/${parent_KP}/subset`;
        return axios.get(url, {
        });//.then(response => response.data);
    }

    getStudents() {
        const url = `${API_URL}/api/students/`;
        return axios.get(url);        
    }

    getStudent(_id) {
        const url = `${API_URL}/api/students/${_id}`;
        return axios.get(url);        
    }

    createStudent(student) {
        // Required fields: student_id, kp
        const _id = student._id;
        const url = `${API_URL}/api/students/`;
        return axios.post(url, student);        
    }

    updateStudent(_id, student) {
        const url = `${API_URL}/api/students/${_id}`;
        return axios.patch(url, student);
    }

    getCourses() {
        const url = `${API_URL}/api/courses/`;     
        return axios.get(url);  
    }
};
