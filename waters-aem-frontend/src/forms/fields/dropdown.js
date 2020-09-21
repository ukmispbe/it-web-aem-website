import React, { useContext } from "react";

import Select from './components/select';
import DisplayMessage from "./components/displaymessage";
import Icons from './components/icons';

import { useFormApi, useFieldApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';
import { renderFormattedLabelText } from '../../utils/labelFunctions';

const Dropdown = ({}) => {
    const { name, label, defaultValue, validation, optionalLabel } = useContext(useFieldApi);
    const { register } = useContext(useFormApi);

    let newLabel = renderFormattedLabelText(label, validation.required, optionalLabel)

    return (
        <div className="cmp-form-field-dropdown--wrapper">
            <label htmlFor={name} data-locator={elementLocator(`${name} label`)}>{newLabel}</label>
            <div className={"cmp-form-field-dropdown--wrapper"} data-locator={elementLocator(name) || 'form-field-dropdown'} aria-describedby="cmp-custom-dropdown__single-value" tabindex="0">
                <Select
                    name={name}
                    defaultValue={defaultValue}
                    ref={register({name: name}, validation)}
                    id={name}
                    tabIndex="-1"
                    aria-label={name}
                />
                <Icons />
            </div>
            <DisplayMessage name={name} validation={validation} />
        </div>
    );
};

export default React.memo(Dropdown);
