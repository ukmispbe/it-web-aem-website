import React, { useContext } from 'react';
import ReactSVG from "react-svg";

import { useFormApi, useFieldApi } from '../../form';

const DisplayMessage = ({
    name,
    validation
}) => {
    const { fieldError } = useContext(useFormApi);
    const { icons } = useContext(useFieldApi);

    const getInfo = (errors) => {
        const fieldErr = fieldError(name);
        let message = "";
        let link = (<></>);

        if (validation && fieldErr) {
            switch (fieldErr.type) {
                case ("required"):
                    message = (fieldErr.message || validation.requiredMsg);
                    break;
                case ("pattern"):
                case ("validate"):
                    if (validation.validateFnName === "email") {
                        if (errors.invalidEmail) message = (errors.invalidEmail.message);
                        if (errors.alreadyRegistered) return showSignIn();
                        break;
                    }

                    message = (fieldErr.message || validation.validationMsg);
                    break;
                default:
                    message = (fieldErr.message)
                    break;
            }
        }

        return (<>
            {message}
            {link}
        </>);
    };

    const showSignIn = () => (<>
        {validation.alreadyRegisteredMsg}
        <a href={validation.signInURL}>
            <ReactSVG
                src={icons.signInIcon}
                className="email-signin"
            />
            {validation.signInMsg}
        </a>
    </>);

    return (
        <span className="cmp-form-field--errorText">
            <useFormApi.Consumer>
                {({ errors }) => getInfo(errors)}
            </useFormApi.Consumer>
        </span>
    );
};

export default DisplayMessage;