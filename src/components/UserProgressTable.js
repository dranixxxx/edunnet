import React from 'react';
import PropTypes from 'utils/propTypes';

import { Table } from 'reactstrap';


const UserProgressTable = ({ headers, usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ id, fullname, lastcourseaccess, }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              {id}
            </td>
            <td className="align-middle text-center">{fullname}</td>
            <td className="align-middle text-center">{lastcourseaccess}</td>
            {/*<td className="align-middle text-center">*/}
            {/*  <Progress value={progress} style={{ height: 5 }} />*/}
            {/*</td>*/}
            {/*<td className="align-middle text-center">{progress}%</td>*/}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fullname: PropTypes.string,
    })
  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;
