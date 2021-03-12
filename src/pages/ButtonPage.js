import React from 'react';

import {
  Row,
  Col,
  //Button,
  //ButtonGroup,
  Card,
  CardHeader,
  //CardSubtitle,
  CardBody,
  Table
} from 'reactstrap';

import Page from 'components/Page';
import Tab from 'components/Tab';
import HocbaData from 'components/HocbaData';
import  djangoService  from  '../api/djangoapi';

const  django =  new  djangoService();

class ButtonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rSelected: null,
      cSelected: [],
      KPs:[],
    };
  }


   componentDidMount() {
      var  self  =  this;
      django.getKP().then(function (result) {
        console.log(result);
          self.setState({ KPs:  result})
      });
  }
  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }


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
                      <td>{c.tree_id}</td>
                      <td>{c.name}</td>
                      </tr>
                )}
            </thead>
            </Table>
            </div>
          </Col>

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
