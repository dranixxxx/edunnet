import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { NumberWidget } from 'components/Widget';
import React from "react";


var courses;
var usercourse;
var https = require('http');
var options = {
  host: '45.64.126.93',
  port: 30446,
  path: '/webservice/rest/server.php?wstoken=578dd2d802eaa52b1fdf79fc921b292a&wsfunction=core_course_get_courses&moodlewsrestformat=json'};
var options2 = {
  host: '45.64.126.93',
  port: 30446,
  path: '/webservice/rest/server.php?wstoken=578dd2d802eaa52b1fdf79fc921b292a&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=2'};
export default class Tab extends React.Component {
    constructor(props) {
        super();
        this.state = {
            activeTab: "1",
            coursesdata: [],
            usercoursedata:[],
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


        async componentDidMount () {
            let coursesdata = await new Promise((resolve => {
                https.request(options, res => {
                      var str = "";
                      res.on("data", function (chunk) {
                        str += chunk;
                      });

                      res.on("end", function () {
                        courses = JSON.parse(str);
                        Array.prototype.push.apply(courses, coursesdata);
                        resolve(courses, coursesdata)
                      });
                }).end();
    }))
    this.setState({ coursesdata })

            let usercoursedata = await new Promise((resolve => {
                https.request(options2, res => {
                      var str = "";
                      res.on("data", function (chunk) {
                        str += chunk;
                      });

                      res.on("end", function () {
                        usercourse = JSON.parse(str);
                        Array.prototype.push.apply(usercourse, usercoursedata);
                        resolve(usercourse, usercoursedata)
                      });
                }).end();
    }))
    this.setState({ usercoursedata })
  }

        render()
        {
            return (
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Môn học gần đây
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                Gợi ý khóa học mới
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                {this.state.usercoursedata.map(({id, fullname, shortname, progress}) => (
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <NumberWidget
                                            id={id}
                                            title={fullname}
                                            subtitle={shortname}
                                            number={progress}
                                            color="secondary"
                                            progressvalue= {progress}
                                            progresslabel= 'progress'

                                        />

                                    </Col>
                                ))}

                            </Row>

                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                {this.state.coursesdata.map(({id, fullname, shortname}) => (
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <NumberWidget
                                            id={id}
                                            title={fullname}
                                            subtitle={shortname}
                                            color="secondary"
                                        />

                                    </Col>
                                ))}

                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            );
        }
}