import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import dl from './Data1.json'


 class Calendar extends Component{

	render() {

    console.log(dl);
		return (
			<table className="table table-striped table-inverse table-hover">
  <thead>
    <tr>
      <th>id</th>
      <th>Name Course</th>
      <th>Duration</th>
      <th>Room</th>
       <th>Price</th>
        
         <th>Teacher_ID</th>
          <th>Time_Start</th>
           <th>UserID</th>
    </tr>
  </thead>
  <tbody>
   {
    dl.map((value,key)=>{
        if(value.teacher_id==12){
      return (
          <tr>
      <td>{value.id}</td>
      <td>{value.name}</td>
      <td>{value.time}</td>
      <td>{value.room}</td>
      <td>{value.price}</td>
       <td>{value.teacher_id}</td>
        <td>{value.start_time}</td>
         <td>{value.user_id}</td>
          </tr>
          )
        }
    })
   }
    
  </tbody>
</table>


			
		);
	}
};

export default Calendar;