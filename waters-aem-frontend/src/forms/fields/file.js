import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { useFormApi, useFieldApi } from '../form';
import { getAttributes } from './utils/validations';
import { elementLocator } from '../../utils/eCommerceFunctions';
import { renderFormattedLabel } from '../../utils/labelFunctions';
import FileUpload from './components/file-upload'

function File(props) {
    const {
        name,
        label,
        optionalLabel,
        chooseAFileToUpload,
        removeTextLabel,
        accept,
        attachmentFileValidMsg,
        attachmentFileInvalidValidMsg,
        attachmentFileSize,
        attachmentFileSizeErrorMsg,
        maxAttachmentFileNameSizeWithExt,
        attachmentFileNameLengthErrorMsg,
        attachmentFileNameErrorMsg,
        validation,
        icons,
        description,
        matchRef
    } = props;

    const inputRef = useRef(null);
    const { emailValidationEndpoint } = useContext(useFieldApi);
    const { register, setError, clearError } = useContext(useFormApi);
    // e.g. (\.pdf|\.jpg|\.png)$
    const fileTypePattern = `(\\${accept.replace(/[,]/g, '|\\').replace(/\s+/g, '')})$`;

    validation.fileTypePattern = fileTypePattern;
    validation.attachmentFileSize = attachmentFileSize;
    validation.maxAttachmentFileNameSizeWithExt = maxAttachmentFileNameSizeWithExt;
    validation.attachmentFileInvalidValidMsg = attachmentFileInvalidValidMsg;
    validation.attachmentFileSizeErrorMsg = attachmentFileSizeErrorMsg;
    validation.attachmentFileNameLengthErrorMsg = attachmentFileNameLengthErrorMsg;
    validation.attachmentFileNameErrorMsg = attachmentFileNameErrorMsg;

    const getRegisterAttributes = ref => {
        inputRef.current = ref;
        return getAttributes(
            ref,
            validation,
            matchRef,
            emailValidationEndpoint,
            setError,
            clearError
        );
    };

    function setRef(ref) {
        register(ref, getRegisterAttributes(ref));
    }

    return (
        <>
            <label
                htmlFor={name}
                data-locator={elementLocator(label) || 'form-field--label'}
            >
                {renderFormattedLabel(label, validation.required, optionalLabel)}
            </label>
            {description && (
                <div className="cmp-form_description">{description}</div>
            )}
            <div className="cmp-form-field file-upload-container">
                <FileUpload
                    name={name}
                    setRef={setRef}
                    setError={setError}
                    clearError={clearError}
                    icons={icons}
                    chooseAFileToUpload={chooseAFileToUpload}
                    removeTextLabel={removeTextLabel}
                    attachmentFileValidMsg={attachmentFileValidMsg}
                    attachmentFileInvalidValidMsg={attachmentFileInvalidValidMsg}
                    attachmentFileSize={attachmentFileSize}
                    attachmentFileSizeErrorMsg={attachmentFileSizeErrorMsg}
                    maxAttachmentFileNameSizeWithExt={maxAttachmentFileNameSizeWithExt}
                    attachmentFileNameLengthErrorMsg={attachmentFileNameLengthErrorMsg}
                    attachmentFileNameErrorMsg={attachmentFileNameErrorMsg}
                    accept={accept}
                    fileTypePattern={fileTypePattern}
                />
            </div>
        </>
    );
}

File.propTypes = {
    name: PropTypes.string,
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
    validation: PropTypes.object,
    label: PropTypes.string,
    optionalLabel: PropTypes.string,
    description: PropTypes.string,
};

File.defaultProps = {
    name: '',
    icons: {},
    chooseAFileToUpload: '',
    removeTextLabel: '',
    attachmentFileValidMsg: '',
    attachmentFileInvalidValidMsg: '',
    attachmentFileSize: '5MB',
    attachmentFileSizeErrorMsg: '',
    maxAttachmentFileNameSizeWithExt: 32,
    attachmentFileNameLengthErrorMsg: '',
    attachmentFileNameErrorMsg: '',
    accept: '',
    validation: {},
    label: '',
    optionalLabel: '',
    description: ''
};

export default File;
