import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import Tab from 'components/Tab';

const HocThemPage = () => {
  return (
    <Page title="Học Thêm"
          breadcrumbs={[{ name: 'hocthem', active: true }]}>
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

export default HocThemPage;
