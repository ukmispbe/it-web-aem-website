import React from 'react';
import { setClickAnalytics } from "../../analytics";
import { elementLocator } from '../../utils/eCommerceFunctions';

const Link = ({
    text,
    url,
    linkName,
	context,
    target
}) => { 

    return (
        <>
            {!!text && !!url &&
                (<a
                    className="cmp-linktile--link"
                    href={url}
                    target={target ? target : undefined}
                    onClick={()=>setClickAnalytics("Account Home", linkName ? linkName : text, url)}
                    data-locator={context ? `${context}-${elementLocator(linkName || text)}` : elementLocator(linkName || text)}
                >
                    {text}
                </a>)
            }
        </>
    );
}
export default Link;