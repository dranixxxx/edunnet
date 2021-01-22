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
  //CardText,
} from 'reactstrap';

import Page from 'components/Page';
import Tab from 'components/Tab';
import HocbaData from 'components/HocbaData';
import aaa from 'components/HocbaData';
  let comment="";
  let abc = aaa;
  if (abc=0){
comment= <p>0 diem</p>
}
if (abc=1){
comment= <p>1 diem</p>
}
if (abc=2){
comment= <p>2diem</p>
}
if (abc=3){
comment= <p>3diem</p>
}
if (abc=4){
comment= <p>4diem</p>
}
if (abc=5){
comment= <p>5diem</p>
}
if (abc=6){
comment= <p>6diem</p>
}
if (abc=7){
comment= <p>7diem</p>
}
if (abc=8){
comment= <p>8diem</p>
}
if (abc=9){
comment= <p>9diem</p>;
}
else {
comment= <p>10diem</p>
};
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
            <Card>
              <CardHeader>Nhận xét</CardHeader>
              <CardBody>{comment}</CardBody>
            </Card>
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
