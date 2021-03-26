import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { NumberWidget } from 'components/Widget';
import React from "react";
import FS1Service from 'components/FS1API';

const fs1Service = new FS1Service();

export default class Tab extends React.Component {
    constructor(props) {
        super();
        this.state = {
            activeTab: "1",
            coursesdata: [],
            usercoursedata:[],
            testcoursedata:[],
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

    componentDidMount() {
        var  self  =  this;
        fs1Service.getRecCourse().then(function (result) {
            console.log(result);
            self.setState({ testcoursedata: result})
        });
    }

    render() {
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
                            Gợi ý khóa học
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
                            {this.state.testcoursedata.map((a) => 
                                <Col lg={6} md={6} sm={6} xs={12}>
                                    <NumberWidget
                                        id={a.id}
                                        title={a.name}
                                        subtitle={a.duration}
                                        color="secondary"
                                    />

                                </Col>
                            )}

                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}