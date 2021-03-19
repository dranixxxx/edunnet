import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardText, CardTitle, Progress, Button } from 'reactstrap';
import Typography from '../Typography';

const NumberWidget = ({
  id,
  title,
  subtitle,
  number,
  color,
  progressvalue, progresslabel ,
  ...restProps
}) => {
  return (
    <Card body {...restProps} >
      <div className="d-flex justify-content-between">
        <CardText tag="div">
          <Typography className="mb-0">
            <strong>{title}</strong>
          </Typography>
          <Typography className="mb-0 text-muted small">{subtitle}</Typography>
        </CardText>
        <CardTitle className={`text-${color}`}>{number}</CardTitle>
      </div>
      <Progress value={progressvalue} color={color} style={{ height: '8px' }} />
      <CardText tag="div" className="d-flex justify-content-between">
        <Typography tag="span" className="text-left text-muted small">
          {progresslabel}
        </Typography>
        <Typography tag="span" className="text-right text-muted small">
          {progressvalue}%
        </Typography>
      </CardText>
      <Button href={`http://45.64.126.93:30446/course/view.php?id=${id}`}>Vào học</Button>
    </Card>
  );
};

NumberWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ]),
  progress: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

NumberWidget.defaultProps = {
  title: '',
  subtitle: '',
  number: 0,
  color: 'primary',
  progress: {
    value: 0,
    label: '',
  },
};

export default NumberWidget;
