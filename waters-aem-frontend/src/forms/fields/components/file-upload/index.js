import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import { validateUploadFile } from '../../utils/fileAttachment';
import Input from '../../../../components/Input/Input';
import Notification from '../file-error-notification';
import Divider from '../divider';

function FileUpload(props) {
  const {
    name,
    setRef,
    clearError,
    className,
    icons,
    chooseAFileToUpload,
    removeTextLabel,
    attachmentFileValidMsg,
    attachmentFileInvalidValidMsg,
    accept,
    fileTypePattern,
    attachmentFileSize,
    attachmentFileSizeErrorMsg,
    maxAttachmentFileNameSizeWithExt,
    attachmentFileNameLengthErrorMsg,
    attachmentFileNameErrorMsg,
  } = props;
  const { upload, preview, valid, invalid } = icons;
  const [file, setFile] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function pickedHandler(files) {
    let pickedFile = {};
    let fileValidation = {};
    const fileType = new RegExp(fileTypePattern, 'i');
    const labels = {
      attachmentFileSizeErrorMsg,
      attachmentFileNameLengthErrorMsg,
      attachmentFileNameErrorMsg
    };
    const config = { maxAttachmentFileNameSizeWithExt, attachmentFileSize };

    if (files && files.length === 1) {
      const fileObj = files[0];
      fileValidation = validateUploadFile(fileObj, labels, config);

      if (!fileType.test(fileObj.name)) {
        setHasError(true);
        setErrorMsg(attachmentFileInvalidValidMsg);
      } else if (fileValidation.status) {
        setHasError(true);
        setErrorMsg(fileValidation.error);
      } else {
        setHasError(false);
        clearError(name);
        setErrorMsg('');
      }
      pickedFile = fileObj;
      setFile(pickedFile);
    }

    if (fileType.test(pickedFile.name) && !fileValidation.status) {
      clearError(name);
      setHasError(false);
    }
  }

  function handleLinkClick(e) {
    e.preventDefault();
    const fileInput = document.getElementById(name);
    if (fileInput && document.createEvent) {
      fileInput.click();
    }
  }

  function resetFile(e) {
    e.preventDefault();
    const fileInput = document.getElementById(name);
    setFile();
    if (fileInput) {
      fileInput.value = '';
    }
    clearError(name);
  }

  return (
    <div className={`file-empty file-upload-input ${className} ${file ? 'has-file' : ''}`}>
      <Input
        showLabel={false}
        id={name}
        name={name}
        className="file-input"
        type="file"
        accept={accept}
        onChange={pickedHandler}
        setRef={setRef}
      />
      <div className="select-file" style={file ? { display: 'none' } : null}>
        <a
          className="file-upload-link"
          onClick={handleLinkClick}
          data-locator={`upload-link-${name}`}
          aria-label={chooseAFileToUpload}
          role="button"
          href=""
        >
          <ReactSVG src={upload} wrapper="span" data-locator={`icon-${name}`} aria-hidden={true} />
          {`${chooseAFileToUpload} (${accept})`}
        </a>
      </div>
      {file && (
        <div className="file-upload__preview">
          <div className="file-info-sec">
            <div className="file-view">
              <ReactSVG className="file-svg" src={preview} data-locator="file-svg" aria-hidden={true} />
              <span data-locator="file-name-added" aria-label={file.name}>{file.name}</span>
              <Divider type="v-small" />
              <a
                className="file-remove-link"
                onClick={resetFile}
                elementLocator="file-remove-link"
                aria-label={removeTextLabel}
                role="button"
                href=""
              >
                {removeTextLabel}
              </a>
            </div>
            <div className="file-notify-sec">
              <div className="notify-container">
                {!hasError && (
                  <Notification
                    variation="inline"
                    className="file-notify"
                    type="success"
                    description={attachmentFileValidMsg}
                    icon={valid}
                    elementLocator="file-format-verified"
                  />
                )}
                {hasError && (
                  <Notification
                    variation="inline"
                    className="file-notify"
                    type="error"
                    description={errorMsg}
                    icon={invalid}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  setRef: PropTypes.func,
  clearError: PropTypes.func,
  icons: PropTypes.object,
  chooseAFileToUpload: PropTypes.string,
  removeTextLabel: PropTypes.string,
  attachmentFileValidMsg: PropTypes.string,
  attachmentFileInvalidValidMsg: PropTypes.string,
  attachmentFileSize: PropTypes.string,
  attachmentFileSizeErrorMsg: PropTypes.string,
  maxAttachmentFileNameSizeWithExt: PropTypes.number,
  attachmentFileNameLengthErrorMsg: PropTypes.string,
  attachmentFileNameErrorMsg: PropTypes.string,
  accept: PropTypes.string,
  fileTypePattern: PropTypes.string
};

FileUpload.defaultProps = {
  className: '',
  name: 'fileUploadInput',
  setRef: () => { },
  clearError: () => { },
  icons: {
    upload: '',
    preview: '',
    valid: '',
    invalid: ''
  },
  chooseAFileToUpload: '',
  removeTextLabel: '',
  attachmentFileValidMsg: '',
  attachmentFileInvalidValidMsg: '',
  attachmentFileSize: '5MB',
  attachmentFileSizeErrorMsg: '',
  maxAttachmentFileNameSizeWithExt: 32,
  attachmentFileNameLengthErrorMsg: '',
  attachmentFileNameErrorMsg: '',
  accept: '.pdf, .jpg, .png',
  fileTypePattern: '(\\.pdf|\.jpg|\.png)$'
};

export default FileUpload;
