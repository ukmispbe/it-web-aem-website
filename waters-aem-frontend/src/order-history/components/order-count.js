import React from 'react';

const orderCount = (props) => {
    const endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
    const startResults = props.current * props.rows - props.rows + 1;

    const getResultsText = () => props.text.resultsText.replace(/[{]startResults[}]/, startResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]endResults[}]/, endResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]count[}]/, props.count.toLocaleString(undefined, {maximumFractionDigits:0}));

    return <div className="cmp-search__resultsCount-container">
        <h2 className="cmp-search__resultsCount">
            {getResultsText()}
        </h2>
    </div>
};

export default orderCount;
