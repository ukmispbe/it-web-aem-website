import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Requirements = ({
    header,
    requirements,
    parent
}) => {

    const renderRequirementFields = requirements => {
        return requirements.map((requirement, i) => {
            const input = document.getElementById(name);
            let isValid = true;

            if (errors[requirement.name]) {
                isValid = errors[requirement.name].ref.name !== name;
            } else if (input) {
                isValid = input.value !== "";
            }

            return (
                <div key={`requirements-info-${i}`}>
                    <ReactSVG
                        id={requirement.name}
                        src={icons.validIcon}
                        className={
                            isValid
                                ? "valid requirements-info-svg"
                                : "requirements-info-svg"
                        }
                    />
                    <div className="requirements-info">{requirement.msg}</div>
                </div>
            );
        });
    };

    return (
        <div className="cmp-form-field--input-requirements">
            <div className="requirements-title">
                {validation.requirementsLabel}
            </div>
            {renderRequirementFields(validation.requirements)}
        </div>
    );
};

Requirements.propTypes = {
    header: PropTypes.string,
    requirements: PropTypes.array.isRequired
};

export default Requirements;