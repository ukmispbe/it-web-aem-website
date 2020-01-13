import React, { useContext } from "react";
import { useFieldApi } from '../form';

const Link = ({}) => {

    const { type, name, text, link, blank, addClass } = useContext(useFieldApi);

    return (
        <>
            {
                text && link && (
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