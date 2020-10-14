import React from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const ResultsCount = (props) => {
    const maxLength = 120;
    const searchQuery = (props.query && props.query.toString().length > maxLength) ? props.query.substring(0,maxLength) + '...' : props.query;

    const getResultsText = (resultsText) => resultsText.replace(/[{]count[}]/, "<span class='count'>" + props.count.toLocaleString(undefined, {maximumFractionDigits:0}) + "</span>");
    const getSearchQuery = (searchQuery) => <h1 className="query">{searchQuery}</h1>;
	const getSuggestedQuery = () => <span>&nbsp;<span className="text-strike">{searchQuery}</span></span>;
	
	const renderSearchQuery = () => (props.spell_suggestion) ? getSearchQuery(props.spell_suggestion) : getSearchQuery(searchQuery);
	const renderSuggestedSearchQuery = () => (props.spell_suggestion) ? getSuggestedQuery() : '';
    
    const renderRelatedSuggestions = () => {
        return (props.spell_related_suggestions.length !== 0) 
            ? <div className='cmp-search__related-suggestions'>{props.text.relatedSearchesText} {getRelatedSuggestions()}</div> 
            : <></>;
    }

    const getRelatedSuggestions = () => (props.spell_related_suggestions.length === 1) 
        ? getRelatedSuggestionLink(props.spell_related_suggestions[0])
        : getRelatedSuggestionLinks(props.spell_related_suggestions).reduce((prev, curr) => <>{prev}<span className="vertical-bar">&#124;</span>{curr}</>);

    const getRelatedSuggestionLink = word => <a className="item" onClick={e => props.onRelatedSuggestionClick(word)}>{word}</a>;
    const getRelatedSuggestionLinks = words => words.map(word => getRelatedSuggestionLink(word));

	return (
		<div className="cmp-search__resultsCount" data-locator="results-count">
			{props.noQuery || props.query === '*:*' && (
				<span dangerouslySetInnerHTML={{__html: getResultsText(props.text.resultsText)}} />
			)}

			{!props.noQuery && props.query !== '*:*' && (
				<>	
					<span dangerouslySetInnerHTML={{__html: getResultsText(props.text.resultsForText)}} />
					{renderSuggestedSearchQuery()}
					{renderSearchQuery()}
					{renderRelatedSuggestions()}
				</>
			)}
		</div>
	);
};

export default ResultsCount;

{/* <div className="cmp-search__resultsCount-container" data-locator="results-count-container">
        {props.noQuery || props.query === '*:*' ? getResultsText(props.text.resultsText) : getResultsText(props.text.resultsForText)}
		{renderSuggestedSearchQuery()}
        <h1 className="cmp-search__resultsCount" data-locator="results-count">
            {props.noQuery || props.query === '*:*' ? null : renderSearchQuery()}
        </h1>
        {renderRelatedSuggestions()}
    </div> */}
