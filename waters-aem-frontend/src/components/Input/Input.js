import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isApplyDisabled: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(e) {
    const { onChange, type } = this.props;
    this.setState({
      value: e.target.value,
    });
    const { value } = e.target;
    this.setState({
      isApplyDisabled: value ? false : true,
    });
    const currentValue = type === 'file' ? e.target.files : e.target.value;
    onChange(currentValue);
  }

  onBlur(e) {
    const { onBlur } = this.props;
    onBlur(e);
  }

  onKeyPress(e) {
    const { onKeyPress } = this.props;
    onKeyPress(e);
  }

  onKeyUp(e) {
    const { onKeyUp } = this.props;
    onKeyUp(e);
  }

  onFocus(e) {
    const { onFocus } = this.props;
    onFocus(e);
  }

  render() {
    const {
      id,
      type,
      showLabel,
      name,
      className,
      placeholder,
      value,
      minLength,
      maxLength,
      readOnly,
      disabled,
      ariaLabel,
      elementLocator,
      accept,
      maxInputLength,
    } = this.props;
    return (
      <>
        {showLabel && <label htmlFor={id} className="visually-hidden">{name}</label>}
        <input
          id={id}
          type={type}
          name={name}
          className={`atom-input ${className}`}
          placeholder={placeholder}
          value={type !== 'file' ? value : undefined}
          readOnly={readOnly}
          disabled={disabled}
          aria-label={ariaLabel}
          data-locator={elementLocator || `input-${type}-${name}`}
          min={minLength}
          max={maxLength}
          maxLength={maxInputLength}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          onKeyUp={this.onKeyUp}
          onFocus={this.onFocus}
          accept={accept}
          autoComplete="off"
        />
      </>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  ariaLabel: PropTypes.string,
  elementLocator: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accept: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  name: '',
  type: 'text',
  showLabel: true,
  className: '',
  placeholder: '',
  value: '',
  minLength: 0,
  maxLength: 999,
  ariaLabel: '',
  readOnly: false,
  disabled: false,
  elementLocator: '',
  onChange: () => { },
  onBlur: () => { },
  onKeyPress: () => { },
  onKeyUp: () => { },
  onFocus: () => { },
  accept: '',
};

export default Input;
