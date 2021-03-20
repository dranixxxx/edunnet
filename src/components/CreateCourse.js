import  React, { Component } from  'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import  djangoService  from  '../api/djangoapi';

const  django =  new  djangoService();

export default class CreactCourse extends Component {
    constructor(props) {
    super(props);
        this.state = {
            KPs: [],
            //courseinfo: {name:'',corr_KPs:[],duration:'',room:'',start_time:''},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var  self  =  this;
      django.getKP().then(function (result) {
        console.log(result);
          self.setState({ KPs:  result})
      });
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
            this.handleCreate();
        event.preventDefault();
    }

    render(){

        return (
            <Form onSubmit={this.handleSubmit}
                >
                  <FormGroup>
                    <Label for="Course">Course</Label>
                    <Input
                      type="text"
                      name="course"
                      placeholder="with a placeholder"
                      ref='name'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="KP">KP</Label>
                    <TreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                    >
                      {this.state.KPs.map((a, id1)  =>
                          <TreeItem nodeId={id1} label={a.name}>
                            {a.subset.map((b, id2)  =>
                              <TreeItem nodeId={id2+10} label={b.name}>
                                {b.subset.map((c, id3)  =>
                                  <TreeItem nodeId={id3+20} label={c.name}>
                                    {c.subset.map((d, id4)  =>
                                      <TreeItem nodeId={id4+30} label={d.name}>
                                        {d.subset.map((e, id5)  =>
                                          <TreeItem nodeId={id5+40} label={e.name} onClick={() =>this.setState({courseinfo : e.name})}></TreeItem>
                                        )}
                                      </TreeItem>
                                    )}
                                  </TreeItem>
                                )}
                              </TreeItem>
                            )}
                          </TreeItem>
                      )}
                    </TreeView>
                    <div>{this.state.courseinfo}</div>
                  </FormGroup>
                  <FormGroup>
                  <Label for="Duration">Duration</Label>
                  <Input
                    type="time"
                    name="time"
                    id="exampleTime"
                    placeholder="time placeholder"
                    ref='Duration'
                  />
                  </FormGroup>
                  <FormGroup>
                  <Label for="Type">Type</Label>
                  <Input type="select" name="type" ref='Type'>
                    <option>VCP</option>
                    <option>Zoom</option>
                    <option>Moodle</option>
                  </Input>
                </FormGroup>
                  <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      placeholder="price placeholder"
                      ref='price'
                    />
                  </FormGroup>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Form>
        );
    }
}