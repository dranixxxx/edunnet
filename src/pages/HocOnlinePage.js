import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
} from 'reactstrap';

import Page from 'components/Page';
import Tab from 'components/Tab';

const HocOnlinePage = () => {
  return (
    <Page
      title="Học Online"
      breadcrumbs={[{ name: 'Học Online', active: true }]}
    >
      <Row>
        <Col>
                  <Card>
                      <CardHeader>Học thêm</CardHeader>
                  <Tab/>
                  </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default HocOnlinePage;
