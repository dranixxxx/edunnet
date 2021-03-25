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

const subjectOptions = [
    {value: '1', label: 'Toán'},
    {value: '2', label: 'Văn'},
    {value: '3', label: 'Anh'},
    {value: '4', label: 'Sử'},
    {value: '5', label: 'Địa'},
    {value: '6', label: 'Hóa'},
    {value: '7', label: 'Sinh'},
    {value: '8', label: 'GDCD'},
    {value: '9', label: 'Tin'},
    {value: '10', label: 'Công nghệ'}
]

const typeOptions = [
    {value: "15", label: "Kiểm tra 15\'"},
    {value: "45", label: "Kiểm tra 45\'"},
    {value: "60", label: "Kiểm tra 60\'"},
    {value: "120", label: "Kiểm tra 120\'"},
    {value: "mid-term", label: "Thi giữa học kỳ"},
    {value: "end-of-term", label: "Thi cuối học kỳ"},
    {value: "end-of-year", label: "Thi cuối năm"}
]

const animatedComponents = makeAnimated();


class StudentEnterTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree_id: '',
            kp: [],
            subject_id: '1',

            options: [null, null, null, null, null],
            placeholders: ['Select...', 'Select...', 'Select...', 'Select...', 'Select...'],
            typePlaceholder: 'Select...',

            selectedOption: null,
            selectedType: null,

            testType: '',
            testDate: '',
            testScore: null,
            maxScore: null,
            teacherName: '',
        };
        
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
        this.setState({placeholders: tmp_placeholders, tree_id: selectedOption.value});

        // if (noOfDots == 1) {
        //     this.setState({subject_id: selectedOption.value})
        // }
    }

    updateMulti = selectedOptions => {
        const kp = selectedOptions.map((obj) => (obj.value));
        this.setState({kp: kp});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tree_id !== this.state.tree_id) {
            var self = this;
            self.service.getKPSubset(self.state.tree_id).then(function (result) {
                const options = result.data.map((obj) => ({
                    value: obj.tree_id,
                    label: obj.name
                }));
                const noOfDots = (self.state.tree_id.match(/\./g) || []).length;
                let tmp_options = [...self.state.options];
                tmp_options[noOfDots+1] = options;
                self.setState({options: tmp_options});
            });
        }
    }

    handleSubmit(event) {
        const dateObj = new Date(this.state.testDate);
        const testDate = dateObj.getTime();

        const testScore = parseFloat(this.state.testScore);

        const request_body = {
            "subject_id": this.state.subject_id,
            "test_type": this.state.testType,
            "test_date": testDate,
            "teacher_name": this.state.teacherName,
            "score": testScore,//parseFloat(`${(this.state.testScore / this.state.maxScore * 10)}`.toFixed(1)),
            "kp": this.state.kp
        }
        console.log(request_body);

        var self = this;
        self.node.loginStudent().then(function (result) {
            const token = result.data.data.token;
            self.node.createExam(token, request_body).then(function (result) {
                console.log(result.data);
            })
        })
    }

    render() {
        return (
            <Page title="Điểm kiểm tra tự nhập" breadcrumbs={[{ name: 'Forms', active: true }]}>
            <Row>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                    <CardHeader>Form nhập điểm</CardHeader>
                    <CardBody>
                        <Form>
                        <FormGroup>
                            <Label for="subjectName">Môn</Label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.updateOnly}
                                placeholder={this.state.placeholders[0]}
                                options={subjectOptions}
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
                                options={typeOptions}
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
                            <Label for="scoreSeparator">&nbsp;&nbsp;/&nbsp;&nbsp;</Label>
                            <Label for="maxScore">
                                <Input
                                    type="number"
                                    defaultValue="10"
                                    onChange={(event) => this.setState({maxScore: event.target.value})}
                                />
                            </Label>
                        </FormGroup>
                        <>
                            <hr style={{borderTop: "10px solid #ffffff"}}/>
                        </>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                        
                        </Form>
                    </CardBody>
                    </Card>
                </Col>
            </Row>
            </Page>
        )
    }
}

export default StudentEnterTest;