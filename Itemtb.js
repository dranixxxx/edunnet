import React, { Component } from 'react';
import axios from 'axios';
class Itemtb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('http://45.64.126.93:8000/api/students/507f191e810c19729de86121')
      .then(res => {
        this.setState({
          products: res.data.kp,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    var { products, loading } = this.state;
    console.log(products, 'product');
    if (loading) {
      return <div>Loading...</div>;
    }
    return products.map((item, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{item.tree_id}</td>
          <td>{item.score}</td>
        </tr>
      );
    });
  }
}

export default Itemtb;
