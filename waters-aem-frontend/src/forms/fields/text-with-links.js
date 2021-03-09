import React, { useContext, useState } from "react";
import { useFieldApi } from '../form';
import { elementLocator } from '../../utils/eCommerceFunctions';
import ReactHtmlParser from 'react-html-parser';

const TextWithLinks = ({}) => {

    const { type, name, config, addClass, consentUrl, openModal } = useContext(useFieldApi);

    const [bodyContent, setBodyContent] = useState('');
    const [isLoading, setLoading] = useState(false);

    if (consentUrl && !isLoading) {
        loadContent();
        setLoading(true);
    }
    // Content Fragment
    function loadContent() {
        try {
            fetch(consentUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'text/html',
                    'Content-Type': 'text/html'
                }
            })
                .then(response => response.text())
                .then(content => {
                    setBodyContent(content);
                })
                .catch(e => console.error(e));
        } catch (error) {
            console.error(error);
        }
    }

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
                consentUrl ? 
                <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}>
                    <div className={openModal ? 'link-open-modal' : ''}>
                        <React.Fragment>{ReactHtmlParser(`<main>${bodyContent}</main>`)}</React.Fragment>
                    </div>
                </div> :
                config.length > 0 && (
                    <div className={`cmp-form-field-${type}--${name} ` + (addClass ? addClass : '')}
                        data-locator={elementLocator(`cmp-form-field-${type}-${name}`)}>
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