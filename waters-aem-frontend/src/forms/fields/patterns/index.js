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
    password: value => {
        // add password validation logic
        return true;
    },
    email: value => {
        return test(
            value,
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
};
