import React, { useContext } from "react";
import { useFieldApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';

const TextWithLinks = ({}) => {

    const { type, name, config, addClass } = useContext(useFieldApi);

    const renderLink = ({ label, url, blank, className, title, id }) => {
        return (
            <a
                href={url}
                target={blank ? "_blank" : ""}
                rel="noopener noreferrer"
                className={className}
                id={id}
                title={title}
                data-locator={elementLocator(label)}>
                {label}
            </a>
            )
    }

    const renderText = ({ text, addClass }) => {
        if (addClass) {
            return (<span className={addClass}>{text}</span>)
        }
        return (text)
    }

    return (
        <>
            {
                config.length > 0 && (
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                        {config.map((block, index) => {
                            let itemToRender = block.type === "link" ? renderLink({...block, className: block.className || '', title: block.title || '', id: block.id || `text-with-link-${index}`}) : renderText(block);
                            let space="";

                            if(block.rightSpace !== "false" || typeof block.rightSpace == "undefined") {
                                space = " ";
                            }
                        return <React.Fragment key={index}>{itemToRender}{space}</React.Fragment>
                        })}
                    </div>
                )
            }
        </>
    );
};

export default TextWithLinks;