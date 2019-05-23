import React from 'react';

const ResultsCount = (props) => {
    const endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
    const startResults = props.current * props.rows - props.rows + 1;
    const maxLength = 120;
    const searchQuery = (props.query && props.query.toString().length > maxLength) ? props.query.substring(0,maxLength) + '...' : props.query;

    const renderSearchTerm = () => (props.spell_suggestion) ? getSuggestedQueryInfo() : getSearchQuery();

    const getSuggestedQueryInfo = () => {
        return <span>
            for&nbsp;
            <span className="text-strike">{searchQuery}</span>
            &nbsp;
            <strong>
                <q className="query">{props.spell_suggestion}</q>.
            </strong>
        </span>;
    }

    const getSearchQuery = () => {
        return <span>
            for&nbsp;
            <strong>
                <q className="query">{searchQuery}</q>.
            </strong>
        </span>;
    }

    const renderRelatedSuggestions = () => {
        return (props.spell_related_suggestions.length !== 0) 
            ? <div className='cmp-search__related-suggestions'>Related Searches {getRelatedSuggestions()}</div> 
            : <></>;
    }

    const getRelatedSuggestions = () => (props.spell_related_suggestions.length === 1) 
        ? getRelatedSuggestionLink(props.spell_related_suggestions[0])
        : getRelatedSuggestionLinks(props.spell_related_suggestions).reduce((prev, curr) => <>{prev}<span className="vertical-bar">&#124;</span>{curr}</>);

    const getRelatedSuggestionLink = word => <a className="item" onClick={e => props.onRelatedSuggestionClick(word)}>{word}</a>;

    const getRelatedSuggestionLinks = words => words.map(word => getRelatedSuggestionLink(word));

    const getResultsText = () => props.text.resultsText.replace(/[{]startResults[}]/, startResults).replace(/[{]endResults[}]/, endResults).replace(/[{]count[}]/, props.count);

    return <div className="cmp-search__resultsCount-container">
        <h2 className="cmp-search__resultsCount">
            {getResultsText()}
            {props.noQuery || props.query === '*:*' ? null : renderSearchTerm()}
        </h2>
        {renderRelatedSuggestions()}
    </div>
};

export default ResultsCount;
