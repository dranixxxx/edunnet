import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, Button, CardTitle, Label, CardText, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import React from "react";
import LMSService from '../api/LMSService';
import LMSNode from '../api/LMSNode';


export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            coursesdata: [],
            usercoursedata:[],
            testcoursedata:[],
        }

        // API-related variables
        // this.studentId = '';

        this.toggle = this.toggle.bind(this);
        this.service = new LMSService();
        this.node = new LMSNode();

        this.handleSubmit = this.handleSubmit.bind(this);
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
        self.node.loginStudent().then(function (result) {
            self.studentId = result.data.data._id;
            console.log(self.studentId);

            self.service.getStudent(self.studentId).then(function (result) {
                self.recCoursesId = result.data.rec_courses.map(obj => obj._id);
                self.enrolCourses = result.data.enrol_courses.map(obj => obj._id);
                console.log("ENROLLL COURSESSSSSSSSSSSS");
                console.log(self.enrolCourses);

                self.service.getCourses().then(function (result) {
                    self.allCourses = result.data;
                    console.log(self.allCourses);
                    console.log(self.recCoursesId);
            

                    self.recCoursesPartial = self.allCourses.filter(function (course) {
                        return self.recCoursesId.includes(course._id);
                    })
                    self.node.getPublicUserInfo("TEACHER").then(function (result) {
                        const allTeachers = result.data.data;
                        const recCoursesAll = self.recCoursesPartial.map((obj) => ({
                            _id: obj._id,
                            name: obj.name,
                            corr_KPs: obj.corr_KPs,
                            teacher_name: allTeachers.filter(function (teacher) {
                                return obj.teacher_id == teacher._id;
                            }).map(teacher => teacher.name),
                            duration: obj.duration,
                        }))
                        console.log(recCoursesAll);
                        self.setState({ testcoursedata: recCoursesAll})
                    })                    
                })
            })
        })
    }

    handleSubmit(event) {
        var self = this;
        self.enrolCourses.push(event.target.value);
        
        const student = {
            "enrol_courses": self.enrolCourses
        }
        self.service.updateStudent(self.studentId, student).then(function (result) {
            console.log(result);
            alert('Đăng ký thành công!');
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


                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        <Row>
                            {this.state.testcoursedata.map(({_id, name, corr_KPs, teacher_name, duration}) => 
                                <Col lg={6} md={6} sm={6} xs={12}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle style={{fontWeight: 'bold'}}>{name}</CardTitle>
                                            <CardText>Giáo viên: {teacher_name}</CardText>
                                            <CardText>
                                                <Label for="kpName">Nội dung chính:</Label>                                             
                                                <ListGroup style={{
                                                                        maxHeight: '100px',
                                                                        overflowY: 'auto'
                                                                        }}>
                                                    {corr_KPs.map(({tree_id, name}) => 
                                                        <ListGroupItem style={{
                                                                            fontSize: '15px',
                                                                            fontStyle: 'italic'
                                                                            }}>
                                                            {name}
                                                        </ListGroupItem>
                                                    )}
                                                </ListGroup>
                                            </CardText>
                                            <CardText>Thời gian học: {duration} phút</CardText>
                                            <Button value={_id} onClick={this.handleSubmit}>Đăng ký học</Button>
                                        </CardBody>
                                    </Card>

                                </Col>
                            )}
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}