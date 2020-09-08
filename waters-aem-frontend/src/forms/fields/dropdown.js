import React, { useContext } from "react";

import Select from './components/select';
import DisplayMessage from "./components/displaymessage";
import Icons from './components/icons';

import { useFormApi, useFieldApi } from '../form';
import { renderFormattedLabelText } from '../../utils/labelFunctions';

const Dropdown = ({}) => {
    const { name, label, defaultValue, validation, optionalLabel } = useContext(useFieldApi);
    const { register } = useContext(useFormApi);

    let newLabel = renderFormattedLabelText(label, validation.required, optionalLabel)

    return (
        <div className="cmp-form-field-dropdown--wrapper">
            <label htmlFor={name}>{newLabel}</label>
            <div className={"cmp-form-field-dropdown--wrapper"}>
                <Select
                    name={name}
                    defaultValue={defaultValue}
                    ref={register({name: name}, validation)}
                />
                <Icons />
            </div>
            <DisplayMessage name={name} validation={validation} />
        </div>
    );
};

export default React.memo(Dropdown);
