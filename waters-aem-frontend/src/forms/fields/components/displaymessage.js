import React, { useState, useEffect } from 'react';
import ReactSVG from "react-svg";

const DisplayMessage = ({
    validation,
    errors,
    fieldErr,
    icon
}) => {
    const [message, setMessage] = useState("");
    const [link, setLink] = useState((<></>));

    useEffect(() => {
        if (validation && fieldErr) {
            switch (fieldErr.type) {
                case ("required"):
                    setMessage(fieldErr.message || validation.requiredMsg);
                    break;
                case ("pattern"):
                case ("validate"):
                    if (validation.validateFnName === "email") {
                        if (errors.invalidEmail) setMessage(errors.invalidEmail.message);
                        if (errors.alreadyRegistered) showSignIn();
                        break;
                    }

                    setMessage(fieldErr.message || validation.validationMsg);
                    break;
                default:
                    setMessage(fieldErr.message)
                    break;
            }
        } else {
            setMessage("");
        }
    }, [fieldErr]);

    const showSignIn = () => {
        setMessage(validation.alreadyRegisteredMsg)
        setLink((
            <a href={validation.signInURL}>
                <ReactSVG
                    src={icon}
                    className="email-signin"
                />
                {validation.signInMsg}
            </a>
        ));
    };

    return (
        <span className="cmp-form-field--errorText">
            {message}
            {link}
        </span>
    );
};

export default DisplayMessage;