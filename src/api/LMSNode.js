import axios from 'axios';
const API_URL = 'http://45.64.126.93:8005';

const TEST_STUDENT = {
    "email": "hadentecker@gmail.com",
    "password": "hadentecker@2020"
}

class LMSNode {

    async loginStudent(student=TEST_STUDENT) {
        const url = `${API_URL}/api/auth/login/`;
        return axios.post(url, student);//.then(response => response.data);
    }

    async createExam(token, exam) {
        const url = `${API_URL}/api/exam/`;
        return axios.post(url, exam, {
            headers: {
                'Authorization': token,
            }
        });
    }

    async getExam(token) {
        const url = `${API_URL}/api/exam/`;
        return axios.get(url, {
            headers: {
                'Authorization': token,
            }
        });
    }
};

export default LMSNode;
// const obj = new LMSNode();
// obj.loginStudent().then(function (result) {
//     console.log(result.data);
//     obj.getExam(result.data.data.token).then(function (result) {
//         console.log(result.data);
//     })
// });