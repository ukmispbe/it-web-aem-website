import EmailService from "../../services/EmailService";
import { validateUploadFile } from '../utils/common';

const test = (value, regex) => regex.test(value);

const removeError = (...refs) => {
    refs.forEach(ref => {
        if (ref) {
            ref.classList.remove("error");
            ref.value && ref.classList.add("valid");
        }
    });

    return true;
};

const getFileValidation = (fileObj, validation) => {
    let status = false;
    let errorMsg = '';
    const {
        fileTypePattern,
        attachmentFileSize,
        maxAttachmentFileNameSize,
        attachmentFileInvalidValidMsg,
        attachmentFileSizeErrorMsg,
        attachmentFileNameLengthErrorMsg
    } = validation;
    const labels = { attachmentFileSizeErrorMsg, attachmentFileNameLengthErrorMsg };
    const config = { maxAttachmentFileNameSize, attachmentFileSize };

    if (fileObj) {
        const fileValidation = validateUploadFile(fileObj, labels, config);
        const fileType = new RegExp(fileTypePattern, 'i');
        if (!fileType.test(fileObj.name)) {
            status = true;
            errorMsg = attachmentFileInvalidValidMsg;
        } else if (fileValidation.status) {
            status = true;
            errorMsg = fileValidation.error;
        }
    }
    return { status, errorMsg };
}

export const functions = {
    noValidation: () => true,
    matching: (value, matchRef, ref) => (value === matchRef.value) ? removeError(ref) : false,
    noWhitespaceOrSpecialChars: (value, ref) => {
        if (value.length) {
            if (
                test(
                    value,
                    /^.*(?=^[^\\\/~`!@#$%^|&*_+=:;"<>?\(\)\]\[\{\}\n\r]+$)(?=^.*[^\s]+).*$/g
                )
            ) {
                return removeError(ref);
            }

            return false;
        } else {
            return removeError(ref);
        }
    },
    noWhitespaceOnly: (value, ref) => {
        if (value) {
            if (test(value, /^.*[^\s]+.*$/)) {
                return removeError(ref);
            }

            return false;
        } else {
            return removeError(ref);
        }
    },
    noWhitespace: (value, ref) => {
        if (value) {
            if (!test(value, /^.*\s+.*$/)) {
                return removeError(ref);
            }

            return false;
        } else {
            return removeError(ref);
        }
    },
    blankOrNumbersOnly: (value, ref) => {
        if (value) {
            if (test(value, /(^[0-9]+$|^$)/)) {
                return removeError(ref);
            }

            return false;
        } else {
            return removeError(ref);
        }
    },
    password: (value, ref, setError, clearError, throwErrors=true) => {
        let validations = 0;
        let newErrors = [];

        // Check length (required)
        if (value.length < 8) {
            newErrors.push({
                name: "shortPassword",
                type: "invalidLength",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            if (throwErrors) clearError("shortPassword");
        }

        // Check for lowercase
        if (!test(value, /^.*[a-z]+.*$/)) {
            newErrors.push({
                name: "noLowercase",
                type: "missingLowercase",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            if (throwErrors) clearError("noLowercase");
        }

        // Check for uppercase
        if (!test(value, /^.*[A-Z]+.*$/)) {
            newErrors.push({
                name: "noUppercase",
                type: "missingUppercase",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            if (throwErrors) clearError("noUppercase");
        }

        // Check for digit
        if (!test(value, /^.*[0-9]+.*$/)) {
            newErrors.push({
                name: "noDigits",
                type: "missingDigits",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            if (throwErrors) clearError("noDigits");
        }

        // Check for special character
        if (!test(value, /^.*[^a-zA-Z0-9]+.*$/)) {
            newErrors.push({
                name: "noSpecial",
                type: "missingSpecial",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            if (throwErrors) clearError("noSpecial");
        }

        if (throwErrors) {
            newErrors.forEach(error => {
                setError(error.name, error.type, error.msg, error.ref);
            });
        } else {
            return newErrors.length ? newErrors.reduce((map, error) => { map[error.name] = true; return map; }, {}) : {};
        }

        if (validations >= 5 && value.length >= 8) {
            return removeError(ref);
        } else {
            return false;
        }
    },
    email: (value, ref, invalidMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications) => {
        // Clear Notifications because Notification Error could be set
        removeNotifications();
        if (
            test(
                value,
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            clearError("invalidEmail");
            return true;
        } else {
            setError("invalidEmail", "invalidEmail", invalidMsg, ref);
            return false;
        }
    },

    newEmail: (value, emailValidationEndpoint, ref, invalidMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications, setValue, name) => {
        // Only Run if invalidMsg is supplied
        if (invalidMsg) {
            if (
                test(
                    value,
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
                const myService = new EmailService(emailValidationEndpoint);
                const newEmail = myService
                    .checkEmail(value)
                    .then(response => {
                        const { isregistereduser: isRegisteredUser, isAccountPartial } = response;
                        window.dispatchEvent(new CustomEvent("setEProcUser", { detail: { isEProcUser: isAccountPartial }}));
                        if (isRegisteredUser) {
                            // Display Sign In span
                            setError(
                                "alreadyRegistered",
                                "alreadyRegistered",
                                invalidMsg,
                                ref
                            );
                            removeNotifications();
                            return false;
                        }
                        
                        removeNotifications();
                        clearError("alreadyRegistered");
                        return removeError(ref);
                    })
                    .catch(err => {
                        // Clear the Input Error, Clear the Text and invoke the Notification
                        setValue(name, "", true);
                        removeError(ref);
                        setErrorBoundaryToTrue({code: 500});
                        return true;
                    });
    
                return newEmail;
            } else {
                removeNotifications();
                clearError("alreadyRegistered");
                return true;
            }
        }
    },
    fileValidation: (value, ref, validation, setError, clearError) => {
        if (ref) {
            if (value && value.length === 1) {
                const { status, errorMsg } = getFileValidation(value[0], validation);
                if (status) {
                    setError(ref.name, ref.name, errorMsg, ref);
                    return false;
                }
                clearError(ref.name);
                return true;
            } else {
                clearError(ref.name);
                return true;
            }
        }
        return true;
    }
};