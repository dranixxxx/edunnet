import axios from 'axios';
const API_URL = 'http://45.64.126.93:8003';
const API_URL_tested = 'http://45.64.126.93:8000/api/courses';


export default class MathForm{

    constructor(){}

    getExpressionDifferentiate(expression, symbol) {
        const url = `${API_URL}/solution?expr=${expression}&sym=${symbol}`;
        return axios.get(url).then(response => response.data);
    }

    getExpressionIntegrate(expression, symbol) {
        const url = `${API_URL}/solution?expr=${expression}&sym=${symbol}`;
        return axios.get(url).then(response => response.data);
    }

    getTestedData() {
        const url = `${API_URL_tested}`;
        return axios.get(url).then(response => response.data);
    }
    

}