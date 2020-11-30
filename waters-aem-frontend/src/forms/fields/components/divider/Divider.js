import React from 'react';
import PropTypes from 'prop-types';
import './Divider.scss';

function Divider(props) {
  const { type, className, elementLocator } = props;
  return <div className={`${type} ${className}`} data-locator={elementLocator || `divider-${type}`} />
}

Divider.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  elementLocator: PropTypes.string,
};

Divider.defaultProps = {
  className: '',
  type: 'v-large',
  elementLocator: '',
};

export default Divider;
