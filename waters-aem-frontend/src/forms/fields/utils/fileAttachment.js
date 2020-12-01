import {FILENAME_REGX} from '../../../constants'

const bytesToKb = size => {
    return parseInt(Math.floor(size / 1000));
};

const configFileSize = config => {
    const { attachmentFileSize } = config;
    if (attachmentFileSize) {
        const fileType = attachmentFileSize.slice(-2);
        switch (fileType) {
            case 'MB':
                return parseInt(attachmentFileSize.split('MB')[0]) * 1024;
            case 'KB':
                return parseInt(attachmentFileSize.split('KB')[0]);
            default:
                return parseInt(attachmentFileSize);
        }
    }
};

export const validateUploadFile = (fileObj, labels, config) => {
    let status = false;
    let error = '';
    const specialChar = new RegExp(FILENAME_REGX);
    const { name, size } = fileObj;

    const fileSize = bytesToKb(size);
    const sizeFromConfig = configFileSize(config);

    if (fileSize > sizeFromConfig) {
        status = true;
        error = labels.attachmentFileSizeErrorMsg;
    } else if (specialChar.test(name)) {
        status = true;
        error = labels.attachmentFileNameErrorMsg;
      } else if (name.length > parseInt(config.maxAttachmentFileNameSizeWithExt)) {
        status = true;
        error = labels.attachmentFileNameLengthErrorMsg;
    }
    return { status, error };
};

export const convertFileIntoBase64 = files => {
    return new Promise(resolve => {
        const response = { fileName: '', base64Value: '' };
        try {
            if (files && files.length === 0) return resolve(response);
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({ fileName: file.name, base64Value: reader.result });
            reader.onerror = () => resolve(response);
        } catch (e) {
            return resolve(response);
        }
    });
};

export const getAttachmentFieldName = data => {
    let name = '';
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value.length > -1) {
            name = key;
        }
    });
    return name;
};