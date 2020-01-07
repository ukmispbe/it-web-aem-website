import React, { useContext } from "react";

import Select from './components/select';
import DisplayMessage from "./components/displaymessage";
import Icons from './components/icons';

import { useFormApi, useFieldApi } from '../form';

const Dropdown = ({}) => {
    const { name, label, validation } = useContext(useFieldApi);
    const { register } = useContext(useFormApi);

    return (
        <div className="cmp-form-field-dropdown--wrapper">
            <label htmlFor={name}>{label}</label>
            <div className={"cmp-form-field-dropdown--wrapper"}>
                <Select
                    name={name}
                    ref={register({name: name}, validation)}
                />
                <Icons />
            </div>
            <DisplayMessage name={name} validation={validation} />
        </div>
    );
};

export default React.memo(Dropdown);
