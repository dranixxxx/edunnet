import Page from 'components/Page';
import React from 'react';
import LMSService from '../api/LMSService';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import LMSNode from '../api/LMSNode';
// import Schema from 'mongoose;
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
} from 'reactstrap';

// const subjectOptions = [
//     {value: '1', label: 'Toán'},
//     {value: '2', label: 'Văn'},
//     {value: '3', label: 'Anh'},
//     {value: '4', label: 'Sử'},
//     {value: '5', label: 'Địa'},
//     {value: '6', label: 'Hóa'},
//     {value: '7', label: 'Sinh'},
//     {value: '8', label: 'GDCD'},
//     {value: '9', label: 'Tin'},
//     {value: '10', label: 'Công nghệ'}
// ]

// const typeOptions = [
//     {value: "15", label: "Kiểm tra 15\'"},
//     {value: "45", label: "Kiểm tra 45\'"},
//     {value: "60", label: "Kiểm tra 60\'"},
//     {value: "120", label: "Kiểm tra 120\'"},
//     {value: "mid-term", label: "Thi giữa học kỳ"},
//     {value: "end-of-term", label: "Thi cuối học kỳ"},
//     {value: "end-of-year", label: "Thi cuối năm"}
// ]

const animatedComponents = makeAnimated();


class StudentEnterTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree_id: '',
            kp: [],
            subject_id: '1',
            parentObj: [null, null, null, null, null],

            options: [null, null, null, null, null],
            subjectOptions: [],
            typeOptions: [],

            placeholders: ['Select...', 'Select...', 'Select...', 'Select...', 'Select...'],
            typePlaceholder: 'Select...',

            selectedOption: null,
            selectedType: null,

            testType: '',
            testDate: '',
            testScore: null,
            maxScore: null,
            teacherName: '',

            // Variables related to API handling
            treeToObjectId: {},
            success: '',
        };

        // API-related variables
        this.studentId = '';
        this.testScore = null;
        this.token = '';
        this.dummyKP = [['1.9.1.1.1', 10]];
        
        // Faking student login -> assume token is ready
        this.node = new LMSNode();

        this.service = new LMSService();
        this.updateOnly = this.updateOnly.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateOnly = selectedOption => {
        const noOfDots = (selectedOption.value.match(/\./g) || []).length;

        let tmp_placeholders = [...this.state.placeholders];
        tmp_placeholders[noOfDots] = selectedOption.label;
        if (noOfDots == 0) {
            this.subject_id = selectedOption.value;
        }
        this.setState({placeholders: tmp_placeholders, tree_id: selectedOption.value});

    }

    updateMulti = selectedOptions => {
        const kp = selectedOptions.map((obj) => (obj.value));
        this.setState({kp: kp});
    }

    componentDidMount() {
        var self = this;

        self.service.getKP().then(function(result) {
            let parentObj = [...self.state.parentObj];
            parentObj[0] = {'subset': result.data} // Insert subset field for intial componentDidUpdate parentObj.subset
            self.setState({parentObj: parentObj});
            console.log(self.state.parentObj);

            self.node.getSubjectList().then(function (result) {
                const subjectOptions = result.data.data.map((obj) => ({
                    value: obj.tree_id,
                    label: obj.name
                }));

                const treeToObjectId = result.data.data.map((obj) => ({
                    tree_id: obj.tree_id,
                    _id: obj._id,
                }));

                self.setState({subjectOptions: subjectOptions, treeToObjectId: treeToObjectId});
            });
        });

        self.node.getTestTypes().then(function (result) {
            const testTypes = result.data.data.map((obj) => ({
                value: obj.name,
                label: `Thi ${obj.name}`
            }));
            self.setState({typeOptions: testTypes});
        });

        self.node.loginStudent().then(function (result) {
            self.token = result.data.data.token;
            self.studentId = result.data.data._id;

            self.service.getStudent(self.studentId).then(function (result) {
                self.oldData = result.data.kp;

            }).catch(function (err) {
                // If student doesn't exist, create a new student
                self.oldData = [];
                const student = {
                    "_id": self.studentId,
                    "kp": self.dummyKP,
                };
                self.service.createStudent(student).then(function (result) {
                    console.log(result.data);
                })
            })
        })


    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.tree_id !== this.state.tree_id) {
            var self = this;
            const noOfDots = (self.state.tree_id.match(/\./g) || []).length;

            const subsetObj = self.state.parentObj[noOfDots].subset.filter(function(obj) {
                return obj.tree_id == self.state.tree_id;
            })[0];
            const options = subsetObj.subset.map((obj) => ({
                value: obj.tree_id,
                label: obj.name,
            }))
            
            let tmp_options = [...self.state.options];
            tmp_options[noOfDots+1] = options;
            let parentObj = [...self.state.parentObj];
            parentObj[noOfDots+1] = subsetObj;
            self.setState({options: tmp_options, parentObj: parentObj});
            // console.log(self.state.parentObj);
        }
    }

    handleSubmit(event) {
        // Format exam data to pass to LMS Node 
        const subject_tree_id = this.subject_id;
        const subjectId = this.state.treeToObjectId.filter(function(obj) {
            return obj.tree_id == subject_tree_id;
        })[0]._id;
        const dateObj = new Date(this.state.testDate);
        const testDate = dateObj.getTime();
        const testScore = parseFloat(this.state.testScore);

        const request_body = {
            "subject_id": subjectId,
            "test_type": this.state.testType,
            "test_date": testDate,
            "teacher_name": this.state.teacherName,
            "score": testScore,//parseFloat(`${(this.state.testScore / this.state.maxScore * 10)}`.toFixed(1)),
            "kp": this.state.kp
        }

        // Store exam details into LMS Node 'Exam'
        // self.node.createExam(token, request_body).then(function (result) {
        //     console.log(result.data);
        // })
        
        // Format KP data to pass to LMS Service
        var self = this;
        self.testScore = testScore;
        const newData = self.state.kp.map(tree_id => ([tree_id, self.testScore]));
        for (const obj of self.oldData) {
            if (!(obj.tree_id in self.state.kp)) {
                const newObj = [obj.tree_id, obj.score];
                newData.push(newObj);
            }
        };
        const student = {
            "kp": newData
        };        

        // Update kp for student in LMS API 'Student'
        self.service.updateStudent(self.studentId, student).then(function (result) {
            console.log(result.data);
            alert("Nhập điểm thành công!");
        })
    }

    render() {
        return (
            // <Page title="Điểm kiểm tra tự nhập" breadcrumbs={[{ name: 'Forms', active: true }]}>
            // <Row>
            //     <Col xl={6} lg={12} md={12}>
            //         <Card>
            //         <CardHeader>Form nhập điểm</CardHeader>
            //         <CardBody>
                        <Form>
                        <FormGroup>
                            <Label for="subjectName">Môn</Label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.updateOnly}
                                placeholder={this.state.placeholders[0]}
                                options={this.state.subjectOptions}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gradeName">Lớp</Label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.updateOnly}
                                placeholder={this.state.placeholders[1]}
                                options={this.state.options[1]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="testType">Loại bài kiểm tra</Label>
                            <Select
                                value={this.state.selectedType}
                                placeholder={this.state.typePlaceholder}
                                options={this.state.typeOptions}
                                onChange={(selectedType) => this.setState({
                                    testType: `${selectedType.value}`,
                                    typePlaceholder: `${selectedType.label}`}
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="testDate">Ngày thi</Label>
                            <Input 
                                type="date"
                                placeholder=""
                                onChange={(event) => this.setState({testDate: event.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="teacherName">Tên giáo viên chấm</Label>
                            <Input
                                type="text"
                                onChange={(event) => this.setState({teacherName: `${event.target.value}`})}
                            />
                        </FormGroup>
                        <>
                            <hr style={{borderTop: "10px solid #ffffff"}}/>
                            <hr style={{borderTop: "3px solid #bbb"}}/>
                        </>
                        <FormGroup>
                            <Label for="Area1LName">Dạng</Label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.updateOnly}
                                placeholder={this.state.placeholders[2]}
                                options={this.state.options[2]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Area2LName">Chương</Label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.updateOnly}
                                placeholder={this.state.placeholders[3]}
                                options={this.state.options[3]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Area3LName">Phần</Label>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={this.updateMulti}
                                options={this.state.options[4]}
                                isMulti
                            />
                        </FormGroup><>
                            <hr style={{borderTop: "10px solid #ffffff"}}/>
                            <hr style={{borderTop: "3px solid #bbb"}}/>
                        </>
                        <Label for="testScoreGroup">Điểm thi</Label>
                        <FormGroup inline>
                            <Label for="testScore">
                                <Input
                                    type="number"
                                    onChange={(event) => this.setState({testScore: event.target.value})}
                                />
                            </Label>
                            {/* <Label for="scoreSeparator">&nbsp;&nbsp;/&nbsp;&nbsp;</Label>
                            <Label for="maxScore">
                                <Input
                                    type="number"
                                    defaultValue="10"
                                    onChange={(event) => this.setState({maxScore: event.target.value})}
                                />
                            </Label> */}
                        </FormGroup>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                        </Form>
        //             </CardBody>
        //             </Card>
        //         </Col>
        //     </Row>
        //     </Page>
        )
    }
}

export default StudentEnterTest;