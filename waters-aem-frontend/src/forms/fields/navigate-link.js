import React, { useContext } from "react";
import { useFieldApi, useFormApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';
import ReactSVG from 'react-svg';

const NavigateLink = ({}) => {

    const { type, name, text, link, blank, addClass, iconSrc } = useContext(useFieldApi);
    const { navigateBackFn } = useContext(useFormApi);

    const handleClick = (e) => {
        e.preventDefault();
        navigateBackFn();
    }

    return (
        <>
            {
                text && link && (
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                        { iconSrc ? <ReactSVG wrapper="span" src={iconSrc} /> : ""}
                        <a
                            href={link}
                            target={blank ? "_blank" : ""}
                            rel="noopener noreferrer"
                            data-locator={elementLocator(text)}
                            onClick={handleClick}
                            >
                            {text}
                        </a>
                    </div>
                )
            }
        </>
    );
};

export default NavigateLink;