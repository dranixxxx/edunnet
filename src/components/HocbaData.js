import React, { Component } from 'react';
import { randomNum } from 'utils/demos';
import { getColor } from 'utils/colors';
import { Radar } from 'react-chartjs-2';
import dl from './Data.json';
import Table from './Table';

const MONTHS = ['Toan'];

const options1111 = {
  scale: {
    ticks: {
      min: 0,
      max: 10,
      stepSize: 1,
    },
  },
};

class HocbaData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: MONTHS,
      trangthai: false,
      monhoc: 'toan',
      diem: '',
    };
  }

  table = value => {
    if (value + 1 !== this.state.index) {
      this.setState({ index: 0 });
      setTimeout(() => {
        this.setState({ index: value + 1 });
      }, 100);
    } else this.setState({ index: 0 });
  };

  elmColors = () => {
    return this.state.month.map((month, index) => {
      return (
        <button
          value={month}
          className="btn btn-default scroll-button"
          onClick={event => {
            const button = document.getElementsByClassName('scroll-button');
            button[0].scrollTo({ top: 0, behavior: 'smooth' });
            this.table(index);
          }}
        >
          {month}
        </button>
      );
    });
  };

  render() {
    const datax = dl.map((value, index) => {
      let data1 = {
        labels: [],
        datasets: [
          {
            label: 'Điểm',
            backgroundColor: getColor('primary'),
            borderColor: getColor('primary'),
            borderWidth: 1,
            data: [],
          },
        ],
      };
      let datas = [];
      let MONTHS1 = [];
      value.KP.map((value1, key1) => {
        datas.push(value1.diem);
        MONTHS1.push(value1.name);
      });
      data1.labels = MONTHS1;
      data1.datasets[0].data = datas;
      return data1;
    });

    const data = {
      labels: [],
      datasets: [
        {
          label: 'Điểm',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: [],
        },
      ],
    };
    let datast = [];
    let labelst = [];
    dl.map((value, index) => {
      datast.push(value.diem);
      labelst.push(value.monhoc);
    });

    data.labels = labelst;
    data.datasets[0].data = datast;

    return (
      <div>
        <Radar data={data} options={options1111} />

        {this.elmColors()}
        {this.state.index ? <Table /> : ''}
      </div>
    );
  }
}

export default HocbaData;
