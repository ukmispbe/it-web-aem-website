import React, { useContext } from 'react';
import ReactSVG from 'react-svg';

import { useFieldApi } from '../../form';
import { useErrorsContext } from '../utils/stateWatcher';
import { useFormApi } from '../../form';
import { elementLocator, htmlParser } from '../../../utils/eCommerceFunctions'

const DisplayMessage = ({ name, validation }) => {
    const { icons } = useContext(useFieldApi);
    const { isAlreadyRegistered } = useContext(useFormApi);
    const errors = useErrorsContext();
    const fieldErr = errors[name];

    const getInfo = () => {
        let message = '';
        let link = <></>;

        if (validation && fieldErr) {
            switch (fieldErr.type) {
                case 'required':
                    message = fieldErr.message || validation.requiredMsg;
                    break;
                case 'pattern':
                case 'validate':
                    if (validation.validateFnName === 'email') {
                        if (errors.invalidEmail)
                            message = errors.invalidEmail.message;
                        if (errors.alreadyRegistered) return showSignIn();
                        if (isAlreadyRegistered) return showSignIn();
                        break;
                    }

                    message =
                        fieldErr.message ||
                        validation.validationMsg ||
                        validation.requiredMsg;
                    break;
                default:
                    message = fieldErr.message;
                    break;
            }
        }

        return (
            <>
                {htmlParser(message)}
                {link}
            </>
        );
    };

    const showSignIn = () => (
        <>
            {validation.alreadyRegisteredMsg}
            <a href={validation.signInURL} className="cmp-sign-in-link" data-locator="cmp-sign-in-link">
                <ReactSVG src={icons.signInIcon} className="email-signin" />
                {validation.signInMsg}
            </a>
        </>
    );
    let dataLocator = elementLocator(`${name}${validation.validateFnName ? "-" + validation.validateFnName : ""}${fieldErr ? "-" + fieldErr.type : ""}-error-label`);
    return <span className="cmp-form-field--errorText" data-locator={dataLocator}>{getInfo()}</span>;
};

export default React.memo(DisplayMessage);
