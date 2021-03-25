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

class ButtonPage extends Component {
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
        className="ButtonPage"
        title="Học bạ"
        breadcrumbs={[{ name: 'học bạ', active: true }]}
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
            <Label></Label>
            <Card>
              <Label></Label>
              <Link to={`/student-enter-test`} activeClassName="active">
                &nbsp;&nbsp;&nbsp;Click vào đây để nhập bài thi mới
              </Link>
              <Label></Label>
            </Card>
          </Col>
          <Col md="4" sm="4" xs="12">
            <div style={{
            maxHeight: '600px',
            overflowY: 'auto'
            }}>
            <Table bordered height="600">
              <div>{this.state.KPs.length}</div>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
                {this.state.KPs.map( c  =>
                      <tr>
                        <td>{c.subject_id}</td>
                        <td>{c.name}</td>
                      </tr>
                )}
            </thead>
            </Table>
            </div>
          </Col>
          
        </Row>

        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
                <Tab/>

            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}

export default ButtonPage;
