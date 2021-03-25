import  React, { Component } from  'react';

import {
  Row,
  Col,
  //Button,
  //ButtonGroup,
  Card,
  CardHeader,
  //CardSubtitle,
  CardBody,
  Table,
  Form,
  FormGroup, Label, Input,
} from 'reactstrap';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';

import Page from 'components/Page';
import Tab from 'components/Tab';
import HocbaData from 'components/HocbaData';
import StudentEnterTest from 'components/StudentEnterTest';



class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rSelected: null,
      cSelected: [],
      KPs:[],
      weakKPs: [],
      courseinfo:[]
    };
  }


  // const onHandleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(cartdata);
  //   getPaymentUrl();
  // };

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Học bạ số"
        breadcrumbs={[{ name: 'học bạ số', active: true }]}
      >
        <Row>
          <Col md="8" sm="8" xs="12">
            <Card>
            <CardHeader>Học bạ</CardHeader>
            <CardBody>
              {/*<Radar data={HocbaData()} options={options1111}/>*/}
              <HocbaData/>
            </CardBody>
          </Card>
          </Col>
          <Col md="4" sm="4" xs="12">
            <Card style={{
            maxHeight: '600px',
            overflowY: 'auto'
            }}>
            <CardHeader>Nhập điểm</CardHeader>
              <CardBody style={{height: "700px"}}>
                {/* <Link to={`/student-enter-test`} activeClassName="active">
                  &nbsp;&nbsp;&nbsp;Click vào đây để nhập bài thi mới
                </Link> */}
                <StudentEnterTest/>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Page>
    );
  }
}

export default DashboardPage;
