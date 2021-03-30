import Page from 'components/Page';
import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Progress,
    Row,
    Table,
    ListGroup, 
    ListGroupItem, 
} from 'reactstrap';
import {HorizontalBar} from "react-chartjs-2";
import {chartjs, productsData} from 'demos/dashboardPage';
import ProductMedia from 'components/ProductMedia';
import dl from "./data1.json";
import LMSService from '../api/LMSService';
import FS2 from '../api/FS2'
import LMSNode from '../api/LMSNode';

export default class ButtonGroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.node = new LMSNode()
    this.service = new LMSService()
    this.fs2 = new FS2()

    this.state = {
      resources: []
    }
  }

  componentDidMount() {
    var self = this;
    self.node.loginStudent().then(function (result) {
      const studentId = result.data.data._id;

      self.service.getStudent(studentId).then(function (result) {
        const weak_KPs = result.data.kp.map(obj => obj.tree_id);
        const weak_KPs_str = weak_KPs.join(',');

        self.fs2.getRecResources(studentId, weak_KPs_str).then(function (result) {

          const resources = result.data;

          self.service.getAllKPs().then(function (result) {
            const all_kps = result.data;
            const kp_ids = resources.map((obj) => obj.KP_available.replace(' ','').split(','));
            const a = all_kps.filter(function (kp) {
              return kp.tree_id == '1.9.1.1.1';
            })
            const ori_KPs = kp_ids.map((li) => (
              li.map((element) => (
                all_kps.filter(function (kp) {
                  return kp.tree_id == element;
                })[0]
              ))
            ));

            for (var i = 0; i < resources.length; i++) {
              resources[i].corr_KPs = ori_KPs[i];
            };
            console.log(resources);
            self.setState({resources: resources});
          })
        })
      })
    })
  };

  render() {
    return (
      <Page
        title="Lộ trình học tập"
        breadcrumbs={[{ name: 'Lộ trình học tập', active: true }]}
      >
        <Row>
              {/* <Col lg="8" md="12" sm="12" xs="12"> */}
              <Col>
                      <Card body>
                      <CardHeader>Gợi ý tài liệu tự học</CardHeader>
                        <Table >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Tên</th>
                              <th>Kiến thức tương ứng</th>
                              <th>URL</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.resources.map((value) => {
                            return (
                              <tr>
                                  <td>{value.id}</td>
                                  <td>{value.title}</td>
                                  <td>
                                  <ListGroup style={{
                                                        maxHeight: '100px',
                                                        overflowY: 'auto'
                                                        }}>
                                    {value.corr_KPs.map(({tree_id, name}) => 
                                        <ListGroupItem style={{
                                                            fontSize: '15px',
                                                            fontStyle: 'italic'
                                                            }}>
                                            {name}
                                        </ListGroupItem>
                                    )}
                                  </ListGroup>
                                  </td>
                                  <td><a href={value.URL}>{value.URL}</a></td>
                              </tr>
                            )
                          })}
                          
                          </tbody>
                        </Table>
                      </Card>
            </Col>
        </Row>
      </Page>
    );
  }
};