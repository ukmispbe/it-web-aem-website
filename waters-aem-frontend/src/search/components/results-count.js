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
                <q className="query">{searchQuery}</q>
            </strong>
        </span>;
    }

    const renderRelatedSuggestions = () => {
        return (props.spell_related_suggestions.length !== 0) 
            ? <div className='cmp-search__related-suggestions'>Related Searches {getRelatedSuggestions()}</div> 
            : <></>;
    }

    const getRelatedSuggestions = () => (props.spell_related_suggestions.length === 1) 
        ? <a className="item" onClick={e => props.onRelatedSuggestionClick(props.spell_related_suggestions[0])}>{props.spell_related_suggestions[0]}</a> 
        : props.spell_related_suggestions.reduce((previous, current) => <><a href="javascript:void(0)" className="item" onClick={e => props.onRelatedSuggestionClick(previous)}>{previous}</a>&#124;<a href="javascript:void(0)" onClick={e => props.onRelatedSuggestionClick(current)} className="item">{current}</a></>);

    return <>
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {props.count} results{' '}
            {props.noQuery || props.query === '*:*' ? null : renderSearchTerm()}
        </h2>
        {renderRelatedSuggestions()}
    </>
};

export default ResultsCount;
