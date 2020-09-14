import React, { useContext } from "react";
import { useFieldApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';

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
                            rel="noopener noreferrer"
                            data-locator={elementLocator(text)}>
                            {text}
                        </a>
                    </div>
                )
            }
        </>
    );
};

export default Link;