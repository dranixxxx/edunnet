import axios from 'axios';
const API_URL = 'http://edunet.tranonline.ml'// process.env.API_LMS_NODE;

//ko dùng
const TEST_STUDENT = {
    "email": "hadentecker@gmail.com",
    "password": "hadentecker@2020"
}

export default class LMSNode {

    loginStudent(student=TEST_STUDENT) {
        console.log(API_URL);
        const url = `${API_URL}/api/auth/login/`;
        return axios.post(url, student);//.then(response => response.data);
    }

    //student create exam???
    createExam(token, exam) {
        const url = `${API_URL}/api/exam/`;
        return axios.post(url, exam, {
            headers: {
                'Authorization': token,
            }
        });
    }

    getExam(token) {
        const url = `${API_URL}/api/exam/`;
        return axios.get(url, {
            headers: {
                'Authorization': token,
            }
        });
    }

    getSubjectList() {
        const url = `${API_URL}/api/subject/`;
        return axios.get(url);
    }

    getTestTypes() {
        const url = `${API_URL}/api/test-type/`;
        return axios.get(url);
    }

    getPublicUserInfo(role) {
        const url = `${API_URL}/api/user/public?role=${role}`;
        return axios.get(url);
    }
};
