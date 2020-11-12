import Page from 'components/Page';
import React from 'react';
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form, FormGroup, Input, Label, Progress,
    Row,
    UncontrolledButtonDropdown
} from 'reactstrap';
import {HorizontalBar} from "react-chartjs-2";
import {chartjs, productsData} from 'demos/dashboardPage';
import ProductMedia from 'components/ProductMedia';


const ButtonGroupPage = () => {
  return (
    <Page
      title="Lộ trình học tập"
      breadcrumbs={[{ name: 'Lộ trình học tập', active: true }]}
    >
      <Row>
            <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Competency</CardHeader>
              <CardBody>
                <HorizontalBar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>

            </Card>
          </Col>
      </Row>
      <Row>
          <Col lg="12" md="12" sm="12" xs="12">
          <Card>
              <CardHeader>Lô trình học tập</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={<Progress animated color="success" value={description}>{description}%</Progress>}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>
      </Row>
    </Page>
  );
};

export default ButtonGroupPage;
