import React from 'react';
import { randomNum } from 'utils/demos';
import { getColor } from 'utils/colors';

const MONTHS = ['Toán', 'Lý', 'Hóa', 'Anh', 'Địa', 'Sử', 'Văn'];
const HocbaData = (
    //moreData = {}
    ) => {
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          randomNum(0,10),
          randomNum(0,10),
          randomNum(0,10),
          randomNum(0,10),
          randomNum(0,10),
          randomNum(0,10),
          randomNum(0,10),
        ],
        //...moreData,
      },
    ],
  };
};
const options1111 = {
  scale: {
    ticks: { beginAtZero: true },
    min: 0,
    max: 10,
    stepSize: 2,
  },
};

export default HocbaData;