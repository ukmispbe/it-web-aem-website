//for Order History and Order Details Pagination; Search has a different format 
import React from 'react';

const CountHeader = (props) => {
    let getResultsText = "";
    if(props.count > 0){
        const endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
        const startResults = props.current * props.rows - props.rows + 1;

        getResultsText = () => props.resultsText.replace(/[{]startResults[}]/, startResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]endResults[}]/, endResults.toLocaleString(undefined, {maximumFractionDigits:0})).replace(/[{]count[}]/, props.count.toLocaleString(undefined, {maximumFractionDigits:0}));
    } else {
        getResultsText = () => props.noResultsText;
    }
    
    return <div className="cmp-order-list__resultsCount-container">
        <h2 className="cmp-order-list__resultsCount" data-locator="order-list-result-count">
            {getResultsText()}
        </h2>
    </div>
};

export default CountHeader;