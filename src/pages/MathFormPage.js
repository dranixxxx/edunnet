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
            expression: '',
            symbol: '',
            solution: '',
            value:'',
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
    }
    
    handleButtonSubmit() {
        //event.preventDefault();
        console.log("submit button clicked");
        console.log(this.state.expression);
        console.log(this.state.symbol);

        if (this.state.expressionType.value === "diff") {
            console.log("differentiate");
            mathForm.getExpressionDifferentiate(this.state.expression, this.state.symbol).then(function (result) {
                //console.log(result);
                this.setState({ solution: this.handleHTML(result) });
                //solutionFile = result;
            });
        } else {
            console.log("integrate");
            mathForm.getExpressionIntegrate(this.state.expression, this.state.symbol).then(function (result) {
                console.log(result);
                this.setState({ solution: this.handleHTML(result) });
                //handleHTML(result);
            });
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
        this.handleButtonSubmit();
        this.handleHTML();
    }

    render() {
        return (
            <Page title="Expression Solver" breadcrumbs={[{ name: 'Solver', active: true }]}>
            <Row>
              <Col>
                <Card>
                    <CardHeader>Input your problem</CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="expressionType" onChange={(event)=>this.handleChange(event)}>
                            <option value="diff">Differentiate</option>
                            <option value="inte">Integrate</option>
                        </Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="expressionText">Expression</Label>
                        <Input 
                            type="textarea" 
                            name="expression"
                            placeholder="Input your question"
                            onChange={(event)=>this.handleChange(event)}
                        />
                        </FormGroup>

                        <FormGroup>
                        <Label for="symbolText">Symbol</Label>
                        <Input 
                            type="textarea" 
                            name="symbol"
                            placeholder="Specify the symbol/variable of the question" 
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

                        <FormGroup check row>
                        <Col sm={{ size: 10, offset: 5 }}>
                            <Button
                                onClick={this.handleAlert}
                            >Check</Button>
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
                        Problem: {this.state.value}
                    </CardText>
                    
                    <CardText>
                        Solution: 
                        
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