import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
} from 'reactstrap';

import Page from 'components/Page';
import Tab from 'components/Tab';

const InputGroupPage = () => {
  return (
    <Page
      title="Input Groups"
      breadcrumbs={[{ name: 'Input Groups', active: true }]}
    >
      <Row>
        <Col  md="8" sm="12" xs="12">
                  <Card>
                      <CardHeader>Học thêm</CardHeader>
                  <Tab/>
                  </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default InputGroupPage;
