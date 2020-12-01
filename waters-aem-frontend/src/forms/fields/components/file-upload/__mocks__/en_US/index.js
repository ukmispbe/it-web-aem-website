export default {
    className: '',
    name: 'fileUploadInput',
    setRef: () => { },
    clearError: () => { },
    icons: {
        upload: '/content/dam/waters/en/brand-assets/icons/upload.svg',
        preview: '/content/dam/waters/en/brand-assets/icons/document.svg',
        valid: '/content/dam/waters/en/brand-assets/icons/success.svg',
        invalid: '/content/dam/waters/en/brand-assets/icons/x.svg'
    },
    chooseAFileToUpload: 'Choose a File to Upload',
    removeTextLabel: 'Remove',
    attachmentFileValidMsg: 'File format verified',
    attachmentFileInvalidValidMsg: 'File format not accepted',
    attachmentFileSize: '3MB',
    attachmentFileSizeErrorMsg: 'File size is over 5MB. Please try again.',
    maxAttachmentFileNameSizeWithExt: 32,
    attachmentFileNameLengthErrorMsg: 'File name is too long. Please try again.',
    attachmentFileNameErrorMsg: 'File name contains special characters. Please try again.',
    accept: '.pdf, .jpg, .png',
    fileTypePattern: '(\\.pdf|\.jpg|\.png)$'
};
