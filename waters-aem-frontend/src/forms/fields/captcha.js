import React, { useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useFieldApi, useFormApi } from '../form';

const Captcha = ({}) => {
    const { siteKey, name, isocode } = useContext(useFieldApi);
    const { register, setValue } = useContext(useFormApi);

    const onChange = value => {
        setValue(name, value, true);
    };

    return (
        <ReCAPTCHA
            sitekey={siteKey}
            onChange={onChange}
            ref={register({ name }, { required: true })}
            hl={isocode}
        />
    );
};

export default Captcha;
