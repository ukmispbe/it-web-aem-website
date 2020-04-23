import React from 'react';
import { setClickAnalytics } from "../../analytics";

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
                onClick={()=>setClickAnalytics("Account Home", linkName)}
             >
                {text}
            </a>)
        }
    </>
);

export default Link;