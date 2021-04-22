import React, { useContext } from "react";
import { useFieldApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';
import ReactSVG from 'react-svg';

const FormNotification = ({}) => {

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
                data-locator={elementLocator(`${id}-link`)}>
                {label}
            </a>
            )
    }

    const renderSpan = ({ text, className }) => {
        return (
            <span className={className}>
                {text}
            </span>
        )
    }

    return (
        <>
            {
                config.length > 0 && (
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                        <div className={`cmp-form-field-left-${type}--${name} ` + (addClass ? addClass : '')}
                            data-locator={elementLocator(`${type}-${name}-icon`)}>
                            <ReactSVG 
                                src="/content/dam/waters/en/brand-assets/icons/attention.svg"
                            />
                        </div>
                        <div className={`cmp-form-field-right-${type}--${name} ` + (addClass ? addClass : '')}
                        data-locator={elementLocator(`${type}-${name}-message`)}>
                        {config.map((block, index) => {
                            let itemToRender = block.type === "link" ? renderLink({...block, className: block.className || '', title: block.title || '', id: block.id || `text-with-link-${index}`}) : renderSpan(block);
                            let space="";

                            if(block.rightSpace !== "false" || typeof block.rightSpace == "undefined") {
                                space = " ";
                            }
                        return <React.Fragment key={index}>{itemToRender}{space}</React.Fragment>
                        })}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default FormNotification;