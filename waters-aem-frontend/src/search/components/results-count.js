import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
function ResultsCount(props) {
    const maxLength = 120;
    const searchQuery = (props.query && props.query.toString().length > maxLength) ? props.query.substring(0,maxLength) + '...' : props.query;
    const getSearchQuery = (query) => <h1 className="query">{query}</h1>;
    const getSuggestedQuery = () => <span className="text-strike">{searchQuery}</span>;

    const getRelatedSuggestionsTags = words => words.map(word =>  {
        return <a href="javascript:void(0);"
                aria-label={word}
                className="item" onClick={e => props.onRelatedSuggestionClick(word)}>
                <ReactSVG src={props.text.searchIcon} />
                <span>{word}</span>
            </a>;
    });

    const getOptions = options => {
        let categoryOptionsList = options.map((a, index) => { 
            return {
                value: index,
                label: a.translation,
                count: a.count
            }
        })

        return categoryOptionsList;
    };

    let categoryLabel = '';
    let actualCount = props.count;
    if (Array.isArray(props.categoryOptions) && props.categoryOptions.length){
        const options = getOptions(props.categoryOptions);
        categoryLabel = props.categoryValue === 0 || props.categoryValue === -1 ? "All" : options[props.categoryValue].label;
        actualCount = props.categoryValue === -1 ? actualCount : options[props.categoryValue].count;
    }

    const renderResultsText = (resultsText) => resultsText.replace(/[{]count[}]/, "<span class='count'>" + actualCount.toLocaleString(undefined, {maximumFractionDigits:0}) + "</span>");
    const renderSearchQuery = () => (props.spell_suggestion) ? getSearchQuery(props.spell_suggestion) : getSearchQuery(searchQuery);
    const renderSuggestedSearchQuery = () => (props.spell_suggestion) ? getSuggestedQuery() : '';
    const renderCategoryText = (selectedCategory) => (selectedCategory !== "") ? <span class='category'>{props.text.inCategoryText + selectedCategory}</span> : '';
    const renderRelatedSuggestions = () => {
        if (props.spell_related_suggestions.length !== 0) {
            return <div className='cmp-search__related-suggestions'>
                    <span class='related-searches-text'>{props.text.relatedSearchesText}</span>
                    {getRelatedSuggestionsTags(props.spell_related_suggestions)}
                </div>
        } else {
            return <></>
        };
    }

    return (
        <div className="cmp-search__resultsCount" data-locator="results-count">
            {(props.noQuery || props.query === '*:*' || props.query === '') && (
                <>
                    <div class='query-box'>
                        <span class='results' dangerouslySetInnerHTML={{__html: renderResultsText(props.text.resultsText)}} />
                    </div>
                    <hr className="small-accent-rule" />
                </>
            )}

            {!props.noQuery && props.query !== '*:*' && props.query !== '' && (
                <>
                    <span class='results' dangerouslySetInnerHTML={{__html: renderResultsText(props.text.resultsForText)}} />
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