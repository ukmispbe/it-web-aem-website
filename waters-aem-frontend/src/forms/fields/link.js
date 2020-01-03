import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Link = ({
    type,
    name,
    text,
    link,
    blank,
    addClass
}) => {
    return (
        <>
            {
                text && link && blank &&(
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                        <a
                            href={link}
                            target={blank ? "_blank" : ""}
                            rel="noopener">
                            {text}
                        </a>
                    </div>
                )
            }
        </>
    );
};

export default Link;