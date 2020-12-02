import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

const Notification = ({
  className,
  variation,
  type,
  title,
  description,
  link,
  linkText,
  icon,
  elementLocator,
}) => (
    <div className={`file-error-notification ${variation} ${type} ${className}`} data-locator={elementLocator}>
      {icon && <ReactSVG className="icon" src={icon} data-locator={`${elementLocator}-icon`} aria-hidden={true} />}
      <div>
        {title && (
          <span className="title" data-locator={elementLocator && `${elementLocator}-title`} aria-label={title}>
            {title}
          </span>
        )}
        {description && (
          <span
            className="description"
            data-locator={elementLocator && `${elementLocator}-description`}
            aria-label={description}
          >
            {description}
          </span>
        )}
        {linkText && (
          <a {...link} elementLocator={elementLocator && `${elementLocator}-link-text`} aria-label={linkText}>
            {linkText}
          </a>
        )}
      </div>
    </div>
  );

Notification.propTypes = {
  className: PropTypes.string,
  variation: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  linkText: PropTypes.string,
  link: PropTypes.shape({
    to: PropTypes.string,
    target: PropTypes.string,
  }),
  elementLocator: PropTypes.string,
};

Notification.defaultProps = {
  className: '',
  variation: '',
  type: '',
  title: '',
  description: '',
  icon: '',
  linkText: '',
  link: {},
  elementLocator: '',
};

export default Notification;
