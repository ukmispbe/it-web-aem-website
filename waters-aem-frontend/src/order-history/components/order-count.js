import React from 'react';

const OrderCount = (props) => {
    const endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
    const startResults = props.current * props.rows - props.rows + 1;

    const getResultsText = () => props.text.replace(/[{]startResults[}]/, startResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]endResults[}]/, endResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]count[}]/, props.count.toLocaleString(undefined, {maximumFractionDigits:0}));

    return <div className="cmp-order-list__resultsCount-container">
        <h2 className="cmp-order-list__resultsCount">
            {getResultsText()}
        </h2>
    </div>
};

export default OrderCount;
