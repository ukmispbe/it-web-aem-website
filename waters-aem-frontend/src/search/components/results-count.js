import React from 'react';

const ResultsCount = (props) => {
    const maxLength = 120;
    const searchQuery = (props.query && props.query.toString().length > maxLength) ? props.query.substring(0,maxLength) + '...' : props.query;

    const getResultsText = (resultsText) => resultsText.replace(/[{]count[}]/, "&lt;b&gt;" + props.count.toLocaleString(undefined, {maximumFractionDigits:0}) + "&lt;/b&gt;");
    const renderSuggestedSearchTerm = () => (props.spell_suggestion) ? getSuggestedQueryInfo() : '';
    const getSuggestedQueryInfo = () => <span>&nbsp;<span className="text-strike">{searchQuery}</span></span>;
    const getSearchQuery = (searchQuery) => <span className="query">{searchQuery}</span>;
    const renderSearchTerm = () => (props.spell_suggestion) ? getSearchQuery(props.spell_suggestion) : getSearchQuery(searchQuery);

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

    return <div className="cmp-search__resultsCount-container" data-locator="results-count-container">
        {props.noQuery || props.query === '*:*' ? getResultsText(props.text.resultsText) : getResultsText(props.text.resultsForText)}
		{renderSuggestedSearchTerm()}
        <h1 className="cmp-search__resultsCount" data-locator="results-count">
            {props.noQuery || props.query === '*:*' ? null : renderSearchTerm()}
        </h1>
        {renderRelatedSuggestions()}
    </div>
};

export default ResultsCount;
