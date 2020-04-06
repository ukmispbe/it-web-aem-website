import React from 'react';
import { parse } from 'query-string';

const Body = ({ text, additionalText }) => {
    let displayAdditionalText;

    if (typeof additionalText === 'string') {
        getAdditionalText = additionalText;
    } else if (additionalText) {
        if (additionalText.query) {
            displayAdditionalText = parse(window.location.search)[
                additionalText.query
            ];
        }
    }

    return (
        <div>
            {text}
            {displayAdditionalText && (
                <span className="cmp-form__additionalText">
                    {displayAdditionalText}
                </span>
            )}
        </div>
    );
};

export default Body;
