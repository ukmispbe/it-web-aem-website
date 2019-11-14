import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from "react-svg";

const Requirements = ({
    header,
    requirements,
    toggled,
    input,
    errors,
    icon
}) => {
    const [validFields, setValidFields] = useState(Array.from({length: requirements.length}, () => false));

    useEffect(() => {
        setValidFields(
            requirements.map(({ name }) => {
                return !hasError(name) && !emptyInput();
            })
        );
    }, [input]);

    const hasError = (name) => {
        if (errors[name]) {
            return errors[name].ref.name === "password";
        }

        return false;
    };

    const emptyInput = () => {
        if (!input) return true;

        return input === "" || input === undefined;
    };

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

Requirements.propTypes = {
    header: PropTypes.string,
    requirements: PropTypes.array.isRequired,
    toggled: PropTypes.bool.isRequired,
    input: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Requirements;