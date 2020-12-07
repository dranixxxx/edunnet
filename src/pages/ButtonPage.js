import React from 'react';

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardText,
} from 'reactstrap';

import Page from 'components/Page';
import {Radar} from "react-chartjs-2";
import Tab from 'components/Tab';
import HocbaData from 'components/HocbaData';
import options1111 from 'components/HocbaData';
class ButtonPage extends React.Component {
  state = {
    rSelected: null,
    cSelected: [],
  };

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
          <Col md="12" sm="12" xs="12">
            <Card>
            <CardHeader>Học bạ</CardHeader>
            <CardBody>
              <Radar data={HocbaData()} options={options1111}/>
            </CardBody>
          </Card>
          </Col>

          <Col md="12" sm="12" xs="12">
            <Card>
                <Tab>

                </Tab>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default ButtonPage;
