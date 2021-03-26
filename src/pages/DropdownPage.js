import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import Tab from 'components/Tab';

const DropdownPage = () => {
  return (
    <Page title="Thi, kiểm tra" breadcrumbs={[{ name: 'dropdowns', active: true }]}>
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

export default DropdownPage;