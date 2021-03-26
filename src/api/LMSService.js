import axios from 'axios';
const API_URL = "http://45.64.126.93:8000"//process.env.API_LMS_SERVICE;

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

    async getStudents() {
        const url = `${API_URL}/api/students/`;
        return axios.get(url);        
    }

    async getStudent(_id) {
        const url = `${API_URL}/api/students/${_id}`;
        return axios.get(url);        
    }

    async createStudent(student) {
        // Required fields: student_id, kp
        const _id = student._id;
        const url = `${API_URL}/api/students/`;
        return axios.post(url, student);        
    }

    async updateStudent(_id, student) {
        const url = `${API_URL}/api/students/${_id}`;
        return axios.patch(url, student);
    }
};

export default LMSService;
// const obj = new LMSService();
// obj.getKPSubset('1').then(function (result) {
//     console.log(result.data);
// });