import React, { useContext } from "react";
import { useFieldApi } from '../form';

const TextWithLinks = ({}) => {

    const { type, name, config, addClass } = useContext(useFieldApi);

    const renderLink = ({ label, url, blank }) => {
        return (
            <a
                href={url}
                target={blank ? "_blank" : ""}
                rel="noopener">
                {label}
            </a>
            )
    }

    const renderText = ({ text }) => {
        return (text)
    }

    return (
        <>
            {
                config.length>0 && (
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                        {config.map((block, index) => {
                            if(block.type === "link") {
                                return <React.Fragment key={index}> {renderLink(block)} </React.Fragment>;
                            } else {
                                return <React.Fragment key={index}> {renderText(block)} </React.Fragment>;
                            }
                        })}
                    </div>
                )
            }
        </>
    );
};

export default TextWithLinks;