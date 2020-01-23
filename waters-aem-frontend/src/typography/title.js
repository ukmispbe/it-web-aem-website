import React from "react";
import PropTypes from "prop-types";

const Title = ({text}) => {
    return (
        <div className="cmp-title">
            <h1 className="cmp-title__text">{text}</h1>
            <div className="cmp-title__print">{text}</div>
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