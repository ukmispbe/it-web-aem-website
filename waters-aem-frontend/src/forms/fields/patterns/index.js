import EmailService from "../../services/EmailService";

const test = (value, regex) => regex.test(value);

const removeError = (...refs) => {
    refs.forEach(ref => {
        if (!ref) console.log("NICE");
        if (ref) {
            ref.classList.remove("error");
            ref.classList.add("valid");
        }
    });

    return true;
};

export const functions = {
    noValidation: () => true,
    checkBoxOrRadio: (value, ref, styleRef) => value ? removeError(ref, styleRef) : false,
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
        if (!test(value, /^.*\W+.*$/)) {
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
    email: (value, ref, invalidMsg, setError, clearError) => {
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

    newEmail: (value, emailUrl, ref, invalidMsg, setError, clearError) => {
        if (
            test(
                value,
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            const myService = new EmailService(emailUrl);
            const newEmail = myService
                .checkEmail(value)
                .then(response => {
                    if (response.isregistereduser) {
                        // Display Sign In span
                        setError(
                            "alreadyRegistered",
                            "alreadyRegistered",
                            invalidMsg,
                            ref
                        );
                        return false;
                    }

                    clearError("alreadyRegistered");
                    return removeError(ref);
                })
                .catch(err => {
                    setError(
                        "alreadyRegistered",
                        "alreadyRegistered",
                        err,
                        ref
                    );
                    return false;
                });

            return newEmail;
        } else {
            clearError("alreadyRegistered");
            return true;
        }
    }
};