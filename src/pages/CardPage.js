import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
// import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import {
    // IconWidget,
    NumberWidget } from 'components/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import Calendar from 'rc-year-calendar';
//require install tippy@4.3.5
import tippy from 'tippy.js';


import {
  // avatarsData,
  chartjs,
  // productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { HorizontalBar,
    // Bar, Line
} from 'react-chartjs-2';
import {
  // MdBubbleChart,
  // MdInsertChart,
  MdPersonPin,
} from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
import {
    // Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    // CardTitle,
    Col, Form, FormGroup, Input, Label,
    Row,
} from 'reactstrap';
// import { getColor } from 'utils/colors';

const currentYear = new Date().getFullYear();
const today = new Date();
//var _ = require("underscore")._;
var _ = require('lodash');
var enrol;
//enrol api
var https = require('https');
var options = {
  host: 'hadtech-platform.tk',
  path: '/webservice/rest/server.php?wstoken=578dd2d802eaa52b1fdf79fc921b292a&wsfunction=core_enrol_get_enrolled_users&moodlewsrestformat=json&courseid=3'};


//event api
var options1 = {
  host: 'hadtech-platform.tk',
  path: '/webservice/rest/server.php?wstoken=578dd2d802eaa52b1fdf79fc921b292a&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json'};

var dataSource1= [
        {
          name: 'today',
          location: 'today',
          startDate: today,
          endDate: today,

        },
        {
          name: 'Google I/O',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 4, 28),
          endDate: new Date(currentYear, 4, 29),
          color: '#48A38C',
        },
        {
          name: 'Microsoft Convergence',
          location: 'New Orleans, LA',
          startDate: new Date(currentYear, 2, 16),
          endDate: new Date(currentYear, 2, 19),

        },
        {
          name: 'Microsoft Build Developer Conference',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 3, 29),
          endDate: new Date(currentYear, 4, 1)
        },
        {
          name: 'Apple Special Event',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 8, 1),
          endDate: new Date(currentYear, 8, 1)
        },
        {
          name: 'Apple Keynote',
          location: 'San Francisco, CA',
          startDate: new Date(2020, 8, 9),
          endDate: new Date(currentYear, 8, 9)
        },
        {
          name: 'Chrome Developer Summit',
          location: 'Mountain View, CA',
          startDate: new Date(currentYear, 10, 17),
          endDate: new Date(currentYear, 10, 18)
        },
        {
          name: 'F8 2015',
          location: 'San Francisco, CA',
          startDate: new Date(currentYear, 2, 25),
          endDate: new Date(currentYear, 2, 26)
        },
        {
          name: 'Yahoo Mobile Developer Conference',
          location: 'New York',
          startDate: new Date(currentYear, 7, 25),
          endDate: new Date(currentYear, 7, 26)
        },
        {
          name: 'Android Developer Conference',
          location: 'Santa Clara, CA',
          startDate: new Date(currentYear, 11, 1),
          endDate: new Date(currentYear, 11, 4)
        },
        {
          name: 'LA Tech Summit',
          location: 'Los Angeles, CA',
          startDate: new Date(currentYear, 10, 17),
          endDate: new Date(currentYear, 10, 17)
        }
      ];

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
        userProgressData : userProgressTableData,
        dataSource: dataSource1,
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
          enrol = enrol.map((enrol) => _.pick(enrol, ["id", "fullname"]));
          Array.prototype.push.apply(enrol, userProgressTableData);
          resolve(enrol, userProgressTableData)
        });
      }).end();
    }))
    this.setState({ userProgressData })

    let dataSource = await new Promise ((resolve => {
      https.request(options1, res => {
        var str = "";
        res.on("data", function (chunk) {
          str += chunk;
        });

        res.on('end', function () {
          var event = JSON.parse(str);
          var event1 = event.events;
          event1 = event1.map(event1 => _.pick(event1,['name', 'timestart', 'eventtype']));
       for(var i=0;i<event1.length;i++){
            var k =event1[i]['timestart'];
            var eve =event1[i]['eventtype'];
      if(eve==="site"){
         eve =event1[i]['eventtype']="black";
        event1[i]['color']=eve;
       delete event1[i]['eventtype'];
      }else{
        eve =event1[i]['eventtype']="#F5BB00";
        event1[i]['color']=eve;
       delete event1[i]['eventtype'];
      }
             //enrol1[i]['timestart']=k;
             function timeConverter(){
              var a = new Date(k * 1000);

              var year = a.getFullYear();
              var month = a.getMonth();
              var date = a.getDate();
              var time = new Date ( year , month , date );
              return time;
            }
            event1[i]['timestart']=timeConverter(k);
            event1[i]['startDate']=timeConverter(k);
            event1[i]['endDate']=timeConverter(k);
            delete event1[i]['timestart'];
          }

          Array.prototype.push.apply(event1, dataSource1);
          resolve(event1, dataSource1)
        });
      }).end();
    }))
    this.setState({ dataSource })
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progressvalue= "75"
              progresslabel= 'Last month'

            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progressvalue= "45"
              progresslabel= 'Last month'
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progressvalue= "90"
              progresslabel= 'Last month'
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progressvalue= "60"
              progresslabel= 'Last month'
            />
          </Col>
        </Row>


        <Row>
          <Col md="8" sm="12" xs="12">
            <Calendar
                dataSource={this.state.dataSource}
                onDayEnter={e => this.handleDayEnter(e)}

            />
          </Col>

          <Col md="4" sm="12" xs="12">
            <Card>
              <CardHeader>Học sinh trong lớp</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name'
                  ]}
                  usersData={this.state.userProgressData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6" sm="12" xs="12">
              <Card>
                <CardHeader>Input Types</CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Plain Text (Static)</Label>
                                <Input
                                    plaintext
                                    value="Some plain text/ static value"
                                    readOnly
                                />
                            </FormGroup>
                            <Row>
                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>
                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>

                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>
                                </Row>
                            <Row>
                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>

                            <Col md="6" sm="6" xs="6">
                            <FormGroup>
                                <Label for="exampleNumber">Number</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="exampleNumber"
                                    placeholder="number placeholder"
                                />
                            </FormGroup>
                            </Col>
                                </Row>
                            <FormGroup>
                                <Label for="exampleText">Text Area</Label>
                                <Input type="textarea" name="text" />
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 5 }}>
                                    <Button>Submit</Button>
                                </Col>
                                </FormGroup>
                        </Form>
                    </CardBody>
              </Card>
          </Col>

            <Col lg="6" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Competency</CardHeader>
              <CardBody>
                <HorizontalBar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>

            </Card>
          </Col>
        </Row>


         <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="gradient-secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <TodosCard todos={todosData} />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
