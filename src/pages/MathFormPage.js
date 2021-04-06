import Page from 'components/Page';
import React, { Component } from 'react';
import MathForm from 'components/MathForm';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

const mathForm = new MathForm();

var solutionFile;

class MathFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expressionType: '',
            expression1: '',
            expression2: '',
            symbol: '',
            solution: "<div> <div/>",
            value:'',
            explanation: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
        //this.handleDifferentiateExpresion = this.handleDifferentiateExpresion.bind(this);
        //this.handleIntegrateExpresion = this.handleIntegrateExpresion(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });

        if (name==="expressionType" && value==="graphplot") {
            this.setState({explanation: 'Nhập (biến, giá trị cao nhất, giá trị thấp nhất)'});  
        } else {
            this.setState({explanation: 'Nhập biến (ví dụ: x)'});
        }
    }

    handleButtonSubmit() {
        //event.preventDefault();
        var self = this;
        var res;
        var sol = 0;

        console.log("submit button clicked");
        console.log(self.state.expressionType);
        console.log(self.state.expression1);
        console.log(self.state.symbol);

        switch(self.state.expressionType) {
            case "differentiate":
                console.log("inside switch case 1");
                mathForm.getExpressionDifferentiate(this.state.expression1, this.state.symbol).then(function (result) {
                    console.log("got result");
                    console.log(result);
                    console.log(typeof result);
                    res = result;
                    console.log("result done");
                    self.setState({solution: res});
                });
                sol = 1;
                break;
            case "integrate":
                console.log("inside switch case 2");
                mathForm.getExpressionIntegrate(this.state.expression1, this.state.symbol).then(function (result) {
                    console.log("got result");
                    console.log(result);
                    console.log(typeof result);
                    res = result;
                    console.log("result done");
                    self.setState({solution: res});
                });
                sol = 1;
                break;
            default:
                console.log("inside default case");
                sol = 0;
                console.log("no result available");
                self.setState({solution: "<div>No result available<div/>"});
                //
        }
    }

    handleAlert() {
        console.log("check button activated");
        alert("hello friends!");
    }

    handleHTML(result) {
        let corsHTML = result;
        let htmlDoc = (new DOMParser()).parseFromString(corsHTML, "text/html");
        this.rawDog = htmlDoc;
        this.htmlData = htmlDoc.documentElement.getElementsByTagName('body')[0].innerHTML;

        return this.htmlData;
    }

    componentDidMount() {
        var self = this;
        //this.handleButtonSubmit();
        this.handleHTML();
    }

    render() {
        console.log(this.state.solution)
        return (
            <Page title="Giải toán" breadcrumbs={[{ name: 'Solver', active: true }]}>
            <Row>
              <Col>
                <Card>
                    <CardHeader>Nhập phương trình</CardHeader>
                    <CardBody>
                        <CardText>Hướng dẫn: </CardText>
                        <CardText>1. Chọn loại bài toán muốn giải </CardText>
                        <CardText>2. Nhập phương trình vào ô "Phương trình" </CardText>
                        <CardText>3. Nhập những dữ liệu được yêu cầu vào ô "Dữ liệu thêm" </CardText>
                        <CardText>4. Ấn nút "Giải toán" </CardText>
                    <Form>
                        <FormGroup>
                        <Label for="exampleSelect">Chọn loại bài toán</Label>
                        <Input type="select" name="expressionType" onChange={(event)=>this.handleChange(event)}>
                            <option></option>
                            <option value="differentiate">Vi phân</option>
                            <option value="integrate">Tích phân</option>
                            <option value="graphplot">Vẽ đồ thị</option>
                            <option value="linearsolve">Giải hệ phương trình</option>
                            <option value="factorize">Phân tích nhân tử</option>
                        </Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="expressionText">Phương trình</Label>
                        <Row xs="2">
                            <Col>
                                <Input name="expression1" placeholder="Nhập phương trình 1"
                                onChange={(event)=>this.handleChange(event)} />
                            </Col>
                            <Col>
                                <Input name="expression2" placeholder="Nhập phương trình 2 (nếu có)"
                                onChange={(event)=>this.handleChange(event)} />
                            </Col>
                        </Row>
                        </FormGroup>

                        <FormGroup>
                        <Label for="symbolText">Nhập thông tin thêm</Label>
                        <Input
                            name="symbol"
                            placeholder={this.state.explanation} 
                            onChange={(event)=>this.handleChange(event)}
                        />
                        </FormGroup>

                        <FormGroup check row>
                        <Col sm={{ size: 10, offset: 5 }}>
                            <Button
                                onClick={this.handleButtonSubmit}
                            >Submit</Button>
                        </Col>
                        </FormGroup>

                    </Form>
                    </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                    <CardHeader>Solution</CardHeader>
                    <CardBody>
                    <CardText>
                        Phương trình: {this.state.expression1}   {this.state.expression2}
                    </CardText>
                        Solution: 
                        <div dangerouslySetInnerHTML={{__html: this.state.solution}} />
                    <CardText>
                    </CardText>
                    </CardBody>
                </Card>
              </Col>  
            </Row>

            </Page>
        );
    };
};


export default MathFormPage;