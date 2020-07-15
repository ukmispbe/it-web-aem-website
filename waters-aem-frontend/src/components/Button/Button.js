import React from 'react';
import PropTypes from 'prop-types';
import getLabelFromChildren from '../../utils/elementLocator';
import './Button.scss';

const Button = ({
  className,
  children,
  inheritedStyles,
  type,
  primary,
  secondary,
  disabled,
  transparent,
  ariaLabel,
  elementLocator,
  ...others
}) => (
    <button
      aria-label={ariaLabel || null}
      className={className}
      disabled={disabled}
      type={type}
      data-locator={elementLocator || `button-${type}-${getLabelFromChildren(children)}`}
      {...others}
    >
      {children}
    </button>
  );

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inheritedStyles: PropTypes.string,
  type: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  ariaLabel: PropTypes.string,
  elementLocator: PropTypes.string,
};

Button.defaultProps = {
  inheritedStyles: '',
  type: 'button',
  primary: false,
  secondary: false,
  disabled: false,
  transparent: false,
  ariaLabel: '',
  className: '',
  elementLocator: '',
};

export default Button;
