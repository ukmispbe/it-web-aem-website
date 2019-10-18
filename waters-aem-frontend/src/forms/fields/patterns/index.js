const test = (value, regex) => {
    return regex.test(value);
};

export const functions = {
    // named validation functions here
    noWhitespaceOrSpecialChars: value => {
        if (value.length) {
            return test(
                value,
                /^.*(?=^[^\\\/~!@#$%^&*_+=:;\]\[\{\}\n\r]+$)(?=^.*[^\s]+).*$/g
            );
        } else {
            return true;
        }
    },
    noWhitespace: value => {
        if (value) {
            return !test(value, /^\s*$/);
        } else {
            return true;
        }
    },
    password: (value, ref, setError, clearError) => {
        let validations = 0;
        let errors = [];

        // Check length (required)
        if (value.length < 8) {
            errors.push({
                name: "shortPassword",
                type: "invalidLength",
                msg: "Password",
                ref: ref
            });
        } else {
            clearError("shortPassword");
        }

        // Check for lowercase
        if (!test(value, /^.*[a-z]+.*$/)) {
            errors.push({
                name: "noLowercase",
                type: "missingLowercase",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            clearError("noLowercase");
        }

        // Check for uppercase
        if (!test(value, /^.*[A-Z]+.*$/)) {
            errors.push({
                name: "noUppercase",
                type: "missingUppercase",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            clearError("noUppercase");
        }

        // Check for digit
        if (!test(value, /^.*[0-9]+.*$/)) {
            errors.push({
                name: "noDigits",
                type: "missingDigits",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            clearError("noDigits");
        }

        // Check for special character
        if (!test(value, /^.*\W+.*$/)) {
            errors.push({
                name: "noSpecial",
                type: "missingSpecial",
                msg: "Password",
                ref: ref
            });
        } else {
            validations++;
            clearError("noSpecial");
        }


        if (validations >= 3 && value.length >= 8) {
            ref.classList.remove('error');
            return true;
        } else {
            errors.forEach(error => {
                setError(error.name, error.type, error.msg, error.ref);
            });
            return false;
        }
    },
    email: value => {
        return test(
            value,
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    matching: (value, matchRef) => {
        return value === matchRef.value;
    }
};
