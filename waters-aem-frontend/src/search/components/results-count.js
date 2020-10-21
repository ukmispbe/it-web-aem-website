import React from 'react';
import PropTypes from 'prop-types';
function ResultsCount(props) {
    const maxLength = 120;
    const searchQuery = (props.query && props.query.toString().length > maxLength) ? props.query.substring(0,maxLength) + '...' : props.query;
    const getSearchQuery = (query) => <h1 className="query">{query}</h1>;
    const getSuggestedQuery = () => <span className="text-strike">{searchQuery}</span>;
    const getRelatedSuggestions = () => (props.spell_related_suggestions.length === 1) 
        ? getRelatedSuggestionLink(props.spell_related_suggestions[0])
        : getRelatedSuggestionLinks(props.spell_related_suggestions).reduce((prev, curr) => <>{prev}<span className="vertical-bar">&#124;</span>{curr}</>);

        const getRelatedSuggestionLink = word => <a className="item" onClick={e => props.onRelatedSuggestionClick(word)}>{word}</a>;
        const getRelatedSuggestionLinks = words => words.map(word => getRelatedSuggestionLink(word));

        const getOptions = options => {
            let categoryOptionsList = options.filter(category => category.count !== 0).map((a, index) => { 
                return {
                    value: index,
                    label: a.translation
                }
            })

            return categoryOptionsList;
        };

    let categoryLabel = '';
    if (Array.isArray(props.categoryOptions) && props.categoryOptions.length){
        const options = getOptions(props.categoryOptions);
        categoryLabel = options[props.categoryValue].label;
    }


    const getResultsText = (resultsText) => resultsText.replace(/[{]count[}]/, "<span class='count'>" + props.count.toLocaleString(undefined, {maximumFractionDigits:0}) + "</span>");
    const renderSearchQuery = () => (props.spell_suggestion) ? getSearchQuery(props.spell_suggestion) : getSearchQuery(searchQuery);
    const renderSuggestedSearchQuery = () => (props.spell_suggestion) ? getSuggestedQuery() : '';
    const renderCategoryText = (selectedCategory) => <span class='category'>{props.text.inCategoryText + selectedCategory}</span>;
    const renderRelatedSuggestions = () => {
        return (props.spell_related_suggestions.length !== 0) 
            ? <div className='cmp-search__related-suggestions'>{props.text.relatedSearchesText} {getRelatedSuggestions()}</div> 
            : <></>;
    }

        return (
            <div className="cmp-search__resultsCount" data-locator="results-count">
                {props.noQuery || props.query === '*:*' && (
                    <>
                        <div class='query-box'>
                            <span dangerouslySetInnerHTML={{__html: getResultsText(props.text.resultsText)}} />
                        </div>
                        <hr className="small-accent-rule" />
                    </>
                )}

                {!props.noQuery && props.query !== '*:*' && (
                    <>	
                        <span dangerouslySetInnerHTML={{__html: getResultsText(props.text.resultsForText)}} />
                        {renderSuggestedSearchQuery()}
                        <div class='query-box'>
                            {renderSearchQuery()} {" "} {renderCategoryText(categoryLabel)}
                        </div>
                        <hr className="small-accent-rule" />
                        {renderRelatedSuggestions()}
                    </>
                )}
            </div>
        );

};

ResultsCount.propTypes = {
    count: PropTypes.number.isRequired,
    query: PropTypes.string,
    noQuery: PropTypes.bool.isRequired,
    spell_related_suggestions: PropTypes.array,
    spell_suggestion: PropTypes.string,
    onRelatedSuggestionClick: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    categoryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    categoryValue: PropTypes.number.isRequired
};

ResultsCount.defaultProps = {
    count: 0,
    query: '',
    noQuery: false,
    spell_related_suggestions: [],
    spell_suggestion: '',
    onRelatedSuggestionClick: () => { },
    text: {},
    categoryOptions: [],
    categoryValue: 0
};

export default ResultsCount;