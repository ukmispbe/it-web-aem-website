import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ siteKey, name, register, setValue }) => {
    const onChange = value => {
        setValue(name, value, true);
    };

    return (
        <ReCAPTCHA
            sitekey={siteKey}
            onChange={onChange}
            ref={register({ name }, { required: true })}
        />
    );
};

export default Captcha;
