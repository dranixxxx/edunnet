import React, {Component} from 'react';
import { randomNum } from 'utils/demos';
import { getColor } from 'utils/colors';
import {Radar} from "react-chartjs-2"

const MONTHS = ['Toán', 'Lý', 'Hóa', 'Anh', 'Địa', 'Sử', 'Văn'];
const aaa = randomNum(0,10)
const aaa2 = randomNum(0,10)
const aaa3 = randomNum(0,10)
const aaa4 = randomNum(0,10)
const aaa5 = randomNum(0,10)
const aaa6 = randomNum(0,10)
const aaa7 = randomNum(0,10)

const gradedata = [aaa
          ];
const gradedata2 = [aaa2];
const gradedata3 = [aaa3];
const gradedata4 = [aaa4];
const gradedata5 = [aaa5];
const gradedata6 = [aaa6];
const gradedata7 = [aaa7];

const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Điểm',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          gradedata,
          gradedata2,
          gradedata3,
          gradedata4,
          gradedata5,
          gradedata6,
          gradedata7,
        ],

    }
  ]
}
const options1111 = {
  scale: {
    ticks: { beginAtZero: true },
    min: 0,
    max: 10,
    stepSize: 2,
  },
};

class HocbaData extends Component {

  render(){
  return (
    <Radar data={data} options={options1111}/>
  );
}
}

export default HocbaData;