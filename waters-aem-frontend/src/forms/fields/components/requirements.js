import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactSVG from "react-svg";

import { functions } from "../patterns/";

const Requirements = ({
    header,
    requirements,
    icon
}, ref) => {
    const [toggled, setToggled] = useState(false);
    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({});
    const [validFields, setValidFields] = useState(Array.from({length: requirements.length}, () => false));

    useEffect(() => {
        setValidFields(
            requirements.map(({ name }) => {
                return !hasError(name) && !emptyInput();
            })
        );
    }, [input]);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            setToggled(!toggled);
            return toggled;
        },
        update: (newInput) => {
            setInput(newInput);
            setErrors(functions.password(newInput, {}, null, null, [], false));
            return input;
        }
    }));

    const hasError = (name) => errors[name];

    const emptyInput = () => input === "" || input === undefined;

    const renderRequirementFields = () => {
        return requirements.map(({ name, msg }, key) => {
            return (
                <div key={`requirements-info-${key}`}>
                    <ReactSVG
                        id={name}
                        src={icon}
                        className={
                            validFields[key]
                                ? "valid requirements-info-svg"
                                : "requirements-info-svg"
                        }
                    />
                    <div className="requirements-info">{msg}</div>
                </div>
            );
        });
    };

    return (
        <div className={"cmp-form-field--input-requirements" + (toggled ? " toggled" : "")}>
            <div className="requirements-title">
                {header}
            </div>
            {renderRequirementFields()}
        </div>
    );
};

export default forwardRef(Requirements);