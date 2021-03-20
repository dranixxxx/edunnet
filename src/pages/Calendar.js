import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import dl from '../components/data1.json'
import CreateCourse from '../components/CreateCourse';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";


 class Calendar extends Component{

	render() {

    console.log(dl);
		return (
		    <>
            <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Tạo khóa học</CardHeader>
              <CardBody>
                <CreateCourse/>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
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
          </Col>
            </Row>


</>
		);
	}
};

export default Calendar;