import React, { useContext } from "react";
import { RHFInput } from 'react-hook-form-input';

import Select from './components/select';
import DisplayMessage from "./components/displaymessage";
import Icons from './components/icons';

import { useFormApi, useFieldApi } from '../form';

const Dropdown = ({}) => {
    const { name, label, validation } = useContext(useFieldApi);
    const { register, setValue } = useContext(useFormApi);

    return (
        <div className="cmp-form-field-dropdown--wrapper">
            <label htmlFor={name}>{label}</label>
            <div className={"cmp-form-field-dropdown--wrapper"}>
                <RHFInput
                    name={name}
                    as={<Select />}
                    mode="onChange"
                    rules={validation}
                    register={register}
                    setValue={setValue}
                />
                <Icons />
            </div>
            <DisplayMessage name={name} validation={validation} />
        </div>
    );
};

export default React.memo(Dropdown);
