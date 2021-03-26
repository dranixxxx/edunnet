import axios from 'axios';
const API_URL = "http://edunet.tranonline.ml"// process.env.API_LMS_NODE;

const TEST_STUDENT = {
    "email": "hadentecker@gmail.com",
    "password": "hadentecker@2020"
}

class LMSNode {

    async loginStudent(student=TEST_STUDENT) {
        console.log(API_URL);
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

    async getSubjectList() {
        const url = `${API_URL}/api/subject/`;
        return axios.get(url);
    }

    async getTestTypes() {
        const url = `${API_URL}/api/test-type/`;
        return axios.get(url);
    }

    async getPublicUserInfo(role) {
        const url = `${API_URL}/api/user/public?role=${role}`;
        return axios.get(url);
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