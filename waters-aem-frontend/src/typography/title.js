import React from "react";
import PropTypes from "prop-types";
import { elementLocator } from "../utils/eCommerceFunctions";

const Title = ({text}) => {
    return (
        <div className="cmp-title" data-locator="title">
            <h1 className="cmp-title__text" data-locator="title-text" data-locator={elementLocator(`${text} title`)}>{text}</h1>
            <div className="cmp-title__print" data-locator="title-print" data-locator={elementLocator(`${text} text`)}>{text}</div>
            <div className="cmp-accent-rule"><hr /></div>
        </div>
    );
}

Title.propTypes = {
    text: PropTypes.string.isRequired
}

Title.defaultProps = {
    text: ""
}

export default Title;