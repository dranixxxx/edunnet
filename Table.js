import React, { Component } from 'react';
import Itemtb from './Itemtb';

class Table extends Component {
  render() {
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Điểm thành phần</h3>
          </div>
          <div className="panel-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>KP</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                <Itemtb />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
