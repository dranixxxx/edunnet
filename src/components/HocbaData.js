import React, {Component} from 'react';
import { randomNum } from 'utils/demos';
import { getColor } from 'utils/colors';
import {Radar} from "react-chartjs-2";
import dl from "./Data.json";

const MONTHS = ['Toan', 'Ly', 'Hoa', 'Anh', 'Đia', 'Su', 'Van'];






const options1111 = {
  scale: {
    ticks: {
      min: 0,
      max: 10,
      stepSize: 1,
    }
  }
};

class HocbaData extends Component {

datatoan = [1,2,3,4];
 data = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Điểm',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: this.datatoan,
    }
  ]
}

  constructor(props) {
    super(props);

    this.state = {
      month :  MONTHS,
      trangthai : false,
      monhoc : 'toan',
      diem : ''
    };
  }

 

  
   table = (event) => {
      var a= event.target.value;
      dl.map((value,key)=>{
         if(a==value.monhoc){
          
            this.datatoan[0]=value.diemmieng;
            this.datatoan[1]=value.diem15;
            this.datatoan[2]=value.diem1tiet;
            this.datatoan[3]=value.diemcuoiky;
            this.data.datasets[0].data=this.datatoan;
            console.log(this.data.datasets[0].data);
            this.setState({trangthai: !this.state.trangthai});
         }

      });
  }


 // setActive =  (monhoc,diem) => {
 //    this.setstate({
 //      monhoc,
 //      diem
 //    });
 //  }
  elmColors = ()=>{
    return this.state.month.map((month, index) => {
        return <button
                      value={month}
                     className="btn btn-default"
                     onClick = {(event)=>{
                                this.table(event);
                                // this.setActive(month.monhoc, month.diem)
                              }}
                >{month}</button>
    });
  } 

  render(){
    
console.log(this.state.month,'abcb')
  return (
    <div>
      
    <Radar data={this.data} options={options1111}/>
    <button 
      type="button" 
      className="btn btn-default"
      onClick = {()=>this.table()}
    >buttonsss
    
    </button>
      {this.elmColors()}
      {this.state.trangthai ? <Radar data={this.data} options={options1111}/> : ''}
    </div>
  );
}
}

export default HocbaData;
