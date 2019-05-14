import React from 'react';

const ResultsCount = ({ current, rows, count, query, noQuery, spell_check, spell_related_suggestions, spell_suggestion }) => {
    const endResults = count > current * rows ? current * rows : count;
    const startResults = current * rows - rows + 1;
    const maxLength = 120;
    const searchQuery = (query && query.toString().length > maxLength) ? query.substring(0,maxLength) + '...' : query;

    const renderSearchTerm = () => (spell_suggestion) ? getSuggestedQueryInfo() : getSearchQuery();

    const getSuggestedQueryInfo = () => {
        return <span>
            for&nbsp;
            <span className="text-strike">{searchQuery}</span>
            &nbsp;
            <strong>
                <q className="query">{spell_suggestion}</q>.
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
        return (spell_related_suggestions.length !== 0) 
            ? <div className='cmp-search__related-suggestions'>Related Searches {getRelatedSuggestions()}</div> 
            : <></>;
    }

    const getRelatedSuggestions = () => (spell_related_suggestions.length === 1) 
        ? <span className="item">{spell_related_suggestions[0]}</span> 
        : spell_related_suggestions.reduce((previous, current) => <><span className="item">{previous}</span>&#124;<span className="item">{current}</span></>);

    return <>
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {count} results{' '}
            {noQuery || query === '*:*' ? null : renderSearchTerm()}
        </h2>
        {renderRelatedSuggestions()}
    </>
};

export default ResultsCount;
