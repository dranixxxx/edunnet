import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import UserProgressTable from 'components/UserProgressTable';


//require install tippy@4.3.5
import tippy from 'tippy.js';
import Tab from 'components/Tab';


import {
  productsData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Radar} from 'react-chartjs-2';
import {
  MdPersonPin,
} from 'react-icons/md';
import {
    Card,
    CardBody,
    CardHeader,
    Col, Table,
    Row,Progress,
} from 'reactstrap';
import HocbaData from 'components/HocbaData';
import options1111 from 'components/HocbaData';

//var _ = require("underscore")._;
var _ = require('lodash');
var enrol;
//enrol api
var https = require('http');
var options = {
  host: '45.64.126.93',
  port: 30446,
  path: '/webservice/rest/server.php?wstoken=578dd2d802eaa52b1fdf79fc921b292a&wsfunction=core_enrol_get_enrolled_users&moodlewsrestformat=json&courseid=3'};

//chart

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
        userProgressData : userProgressTableData,

    };
  }

  handleDayEnter(e) {
    if (e.events.length > 0) {
      var content = '';

      for (var i in e.events) {
        content += '<div class="event-tooltip-content">'
          + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
          + '<div class="event-details">' + e.events[i].location + '</div>'
          + '</div>';
      }

       if (this.tooltip != null) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      this.tooltip = tippy(e.element, {
          placement: 'right',
          content: content,
          animation: 'shift-away',
          arrow: true
      });
      this.tooltip.show();
    }
  }

  async componentDidMount () {
    let userProgressData = await new Promise ((resolve => {
      https.request(options, res => {
        var str = "";
        res.on("data", function (chunk) {
          str += chunk;
        });

        res.on("end", function () {
          enrol = JSON.parse(str);
          enrol = enrol.map((enrol) => _.pick(enrol, ["id", "fullname", "lastcourseaccess"]));
          Array.prototype.push.apply(enrol, userProgressTableData);
          resolve(enrol, userProgressTableData)
        });
      }).end();
    }))
    this.setState({ userProgressData })
      console.log(userProgressData[1].lastcourseaccess)
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Trang chủ"
        breadcrumbs={[{ name: 'Trang chủ', active: true }]}
      >
        <Row>
            <Col md="12" sm="12" xs="12">
            <Card>
                <CardHeader>Tin nổi bật</CardHeader>
                <CardBody></CardBody>
            </Card>
            </Col>
        </Row>
        <Row>
          <Col md="8" sm="12" xs="12">
              <div>
            <Card>
            <CardHeader>Học bạ</CardHeader>
            <CardBody>
              <HocbaData/>
            </CardBody>
          </Card>
              </div>

             <div>
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
             </div>
              <div>
                  <Card>
                      <CardHeader>Học thêm</CardHeader>
                  <Tab/>
                  </Card>
              </div>
              <div>
                  <Card>
                      <CardHeader>Thi, kiểm tra</CardHeader>
                  <Tab/>
                  </Card>
              </div>
          </Col>



          <Col md="4" sm="12" xs="12">
              <div>
            <Card>
              <CardHeader>Thông tin chung</CardHeader>
              <CardBody>
                  <Table bordered>
                    <tr>
                        <td>
                            <CardHeader type="h1">
                                Số khóa đã học
                            </CardHeader>
                            <CardBody>1</CardBody>
                        </td>
                        <td>
                            <CardHeader type="h1">
                                Số khóa hoàn thành
                            </CardHeader>
                            <CardBody>0</CardBody>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CardHeader type="h1">
                                Số huy hiệu
                            </CardHeader >
                            <CardBody>0</CardBody>
                        </td>
                        <td>
                            <CardHeader type="h1">
                                Điểm cao nhất
                            </CardHeader>
                            <CardBody>0</CardBody>
                        </td>
                    </tr>
                  </Table>
              </CardBody>
            </Card>
                  </div>
              <div>
                <Card>
              <CardHeader>Sự kiện sắp tới</CardHeader>
                    <CardBody>
                        <UserProgressTable
                            headers={[
                            <MdPersonPin size={25} />,
                            'name',
                            'last course access',
                            ]}
                            usersData={this.state.userProgressData}
                        />

                    </CardBody>
                    </Card>
              </div>
          </Col>
        </Row>


      </Page>
    );
  }
}
export default DashboardPage;
