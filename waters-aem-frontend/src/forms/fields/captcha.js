import React, { useContext, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import DisplayMessage from './components/displaymessage';

import { useFieldApi, useFormApi } from '../form';

const Captcha = ({}) => {
    const { siteKey, name, isocode, validation } = useContext(useFieldApi);
    const { register, setValue } = useContext(useFormApi);

    useEffect(() => {
        return () => {
            register({ name }, { required: false });
        }
    }, [])

    const onChange = value => {
        setValue(name, value, true);
    };

    return (
        <>
            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}
                ref={register({ name }, { required: validation.required })}
                hl={isocode}
                data-locator="captcha"
            />
            <DisplayMessage name={name} validation={validation} />
        </>
    );
};

export default React.memo(Captcha);
