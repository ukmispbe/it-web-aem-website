import React from 'react';

const Link = ({
    text,
    url
}) => (
    <>
        {!!text && !!url &&
            (<a className="cmp-linktile--link" href={url}>
                {text}
            </a>)
        }
    </>
);

export default Link;