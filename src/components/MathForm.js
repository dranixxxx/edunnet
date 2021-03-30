import axios from 'axios';
const API_URL = 'http://45.64.126.93:8003';

export default class MathForm{

    constructor(){}

    getExpressionDifferentiate(expression, symbol) {
        const url = `${API_URL}/diffstep?expr=${expression}&sym=${symbol}`;

        return axios.get(url).then(res => res.data);
    }

    getExpressionIntegrate(expression, symbol) {
        const url = `${API_URL}/intstep?expr=${expression}&sym=${symbol}`;
        // const url = `${API_URL}`;
        // axios.get(url).then(function (result) {
        //     console.log("REAL DATAHEREEEEEEEEEEEEEEEee");
        //     console.log(result.data);
        // });
        return axios.get(url).then(res => res.data);
    }

}