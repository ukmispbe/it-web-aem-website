import React, { useContext } from "react";
import { useFieldApi } from '../form';

const Text = ({}) => {

    const { type, name, config, addClass } = useContext(useFieldApi);

    console.log(config);

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
                                return <> {renderLink(block)} </>;
                            } else {
                                return <> {renderText(block)} </>;
                            }
                        })}
                    </div>
                )
            }
        </>
    );
};

export default Text;