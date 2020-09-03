import React from 'react';
import { setClickAnalytics } from "../../analytics";
import { elementLocator } from '../../utils/eCommerceFunctions';

const Link = ({
    text,
    url,
    linkName
}) => (
    <>
        {!!text && !!url &&
            (<a
                className="cmp-linktile--link"
                href={url}
                onClick={()=>setClickAnalytics("Account Home", linkName ? linkName : text, url)}
                data-locator={elementLocator(text)}
             >
                {text}
            </a>)
        }
    </>
);

export default Link;