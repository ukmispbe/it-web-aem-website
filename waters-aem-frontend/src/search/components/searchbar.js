import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'throttle-debounce';
import { SearchService } from '../services/index';
import OverLay from './overlay';
import PropTypes from 'prop-types';
import screenSizes from "../../scripts/screenSizes";
import cookieStore from '../../stores/cookieStore';
import { isEprocurementUser, getIsoCode } from '../../utils/userFunctions';
import CategoryDropdown from '../../header-search-category-dropodown';

const cssOverridesForSearchBar = "cmp-search-bar__auto-suggest--open";
const cssOverridesForSearchBody = "cmp-search-body__auto-suggest--open";
const searchBarFocusClassName = 'cmp-search-bar--focus';

const SUGGESTION = 'suggestion';
const FACET = 'facet';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.inputElement = null;

        this.eprocIsoCode = '';

        this.searchBarRef = React.createRef();

        this.search = this.updateSearchService(isEprocurementUser() ? getIsoCode() : this.props.isocode);

        let searchValue = this.search.getUrlParameter('keyword', window.location.search.substring(1));
        let categoryValue = this.search.getUrlParameter('category', window.location.search.substring(1));
        if (this.search.isDefaultKeyword(searchValue)) searchValue = '';

        this.state = {
            value: searchValue ? searchValue : '',
            suggestions: [],
            openOverlay: false,
            placeholder: screenSizes.isMobile() ? this.props.placeholderMobile : this.props.placeholderTablet,
            recentSearches: cookieStore.getRecentSearches() || [],
            searchCategory: '',
            searchContentType: '',
            selectedCategory: categoryValue ? categoryValue : 0,

        };

        this.state.recentSuggestions = this.formatSuggestions(this.state.value.trim(), this.state.recentSearches);

        this.handleSuggestionsFetchRequestedDebounce = debounce(250, this.handleSuggestionsFetchRequested);
        this.handleWindowResizeDebounce = debounce(150, this.handleViewChange);
    }

    updateSearchService = (isocode) => {
        return new SearchService(isocode, this.props.baseUrl);
    }

    componentDidMount = () => {
        this.inputElement = document.querySelectorAll('.cmp-search-bar .react-autosuggest__container .react-autosuggest__input')[0];
        // this is for desktop
        window.addEventListener('resize', this.handleWindowResizeDebounce);
        // this is for iPad orientation
        window.addEventListener('orientationchange', this.handleViewChange);
        // this is for mobile devices
        window.addEventListener('deviceorientation', this.handleViewChange);
    }

    renderSearchBar = () => {
        return (
            <> 
                {this.renderCategories()}
                <div ref={this.searchBarRef} className={`cmp-search-bar ${this.props.customStyle}`} id="notesSearch" onClick={this.handleAutosuggestClick}>
                    {this.renderAutoSuggest()}
                    <div className="cmp-search-bar__icons">
                        {this.renderHideClearIcon()}
                        {this.renderSearchIcon()}
                    </div>
                </div>
            </>
        )
    }
    render() {
        return (
            <>
                {!this.props.disableOverlay && <OverLay isOpen={this.state.openOverlay} />}
                {!screenSizes.isMobile() ? 
                <div className="cmp-search-bar-group">
                    {this.renderSearchBar()}
                </div> :
                    this.renderSearchBar()
                }
            </>
        );
    }

    transformSuggestionObject = (suggestions, recentSuggestions = []) => {
        const updatedSuggestions = [];
        if (suggestions && suggestions.length) {
            updatedSuggestions.push({
                title: '',
                suggestions: suggestions
            });
        }
        if (recentSuggestions && recentSuggestions.length) {
            updatedSuggestions.push({
                title: this.props.labels.recentlySearched,
                suggestions: recentSuggestions
            });
        }
        return updatedSuggestions;
    }

    renderSectionTitle = (section = {}) => section.title && section.suggestions && section.suggestions.length ? <strong>{section.title}</strong> : '';

    getSectionSuggestions = (section = {}) => section.suggestions;

    handleCategoriesClick = (e) => { 
        this.setState({ selectedCategory:e.value });
    };

    getSelectedCategoryIndex = () => {
       const index = this.props.categories.findIndex(x => x.value === this.state.selectedCategory.toUpperCase());
       return index !== -1 ? index : 0;
    }

    renderAutoSuggest = () => {
        const inputProps = {
            placeholder: this.state.placeholder,
            value: this.state.value,
            onChange: this.handleSearchValueChange,
            onKeyPress: this.handleSearchValuePress,
            onBlur: this.handleSearchValueBlur,
            'aria-label': this.props.labels.autoSuggest
        };

        if (isEprocurementUser() && !this.eprocIsoCode) {
            this.eprocIsoCode = getIsoCode();
            this.search = this.updateSearchService(this.eprocIsoCode);
        }

        return <Autosuggest
                    multiSection={true}
                    suggestions={this.transformSuggestionObject(this.state.suggestions, this.state.recentSuggestions)}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedDebounce}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.handleSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValueCallback}
                    renderSuggestion={this.renderSuggestionCallback}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                    shouldRenderSuggestions={() => true}
                    inputProps={inputProps}/>;
    };

    renderCategories = () => {
        return <CategoryDropdown
            categoryDownIcon={this.props.iconDown}
            categoryLabelPrefix={screenSizes.isMobile() ? this.props.labels.categoryLabel : ''}
            categoryIsSearchable={false}
            categoryOnChange={(e)=> this.handleCategoriesClick(e)}
            categoryOptions={this.props.categories}
            categoryValue={this.getSelectedCategoryIndex()} />
    }

    renderHideClearIcon = () => (this.state.value) ? this.renderClearIcon() : <></>;

    renderClearIcon = () => <button aria-label={this.props.labels.clear} onClick={e => this.handleClearIconClick(e)} onMouseDown={e => e.preventDefault()} className="clear-icon"><ReactSVG src={this.props.iconClear} className="cmp-search-bar__icons-clear" /></button>

    renderSearchIcon = () => <button aria-label={this.props.labels.search} onClick={e => this.handleSearchIconClick(e)} onMouseDown={e => e.preventDefault()} className="search-icon"><ReactSVG aria-hidden="true" src={this.props.iconSearch} className="cmp-search-bar__icons-search" /></button>;

    // Update searchbar placeholder message depending on the view and window size
    handleViewChange = () => {
        if (screenSizes.isMobile() && this.state.placeholder !== this.props.placeholderMobile) {
            this.setState({ placeholder: this.props.placeholderMobile });
        } else if (!screenSizes.isMobile() && this.state.placeholder !== this.props.placeholderTablet) {
            this.setState({ placeholder: this.props.placeholderTablet })
        }
    }

    handleAutosuggestClick = (e) => {
        if (Array.from(e.target.classList).find(element => element === 'react-autosuggest__input--focused')) {
            this.addSearchBarFocusCss();
        }
    }

    handleSearchValuePress = e => {
        if (e.key !== 'Enter') return;

        if (this.state.value.length !== 0) {
            this.handleSuggestionSelected(e, { suggestionValue: this.state.value });
        }
    };

    handleSearchIconClick = e => {
        if (this.state.value.length !== 0) {
            this.handleSuggestionSelected(e, { suggestionValue: this.state.value });
        }
    }

    handleClearIconClick = e => {
        this.inputElement.focus();
        this.addSearchBarFocusCss();
        this.setState(
            { value: '', suggestions: [], openOverlay: !!this.state.recentSuggestions.length },
            () => !this.state.recentSuggestions.length && this.removeCssOverridesForSearchBody()
        );
    }

    handleSearchValueChange = (event, { newValue }) => {
        if (newValue.length === 0 && !this.state.recentSuggestions.length) {
            // this will prevent white space from appearing below the search bar
            // as the user backspaces and deletes all of the characters
            this.removeCssOverridesForSearchBar();
        }

        this.setState({ value: newValue }, () => {
            if (newValue.length === 0) {
                // the user has manually cleared the search bar so need to update the state
                this.setState({ suggestions: [], openOverlay: !!this.state.recentSuggestions.length || false }, () => !(!!this.state.recentSuggestions.length || false) && this.removeCssOverridesForSearchBody());
            }
        });
    }

    handleSearchValueBlur = (event, { highlightedSuggestion }) => this.removeSearchBarFocusCss();

    /*Handle facets limit to show on suggestions
    * Only show two type of category inside the suggestion box
    * One category show only once
    */
    handleFacets = (facetsInfo) => {
        const facets = [];
        let lastCategory;
        facetsInfo.forEach(facet => {
            if(facets.length < 3 && lastCategory !== facet.catergory){
                facets.push(facet);
                lastCategory = facet.catergory;
            }
        });
        return facets;
    }
    handleSuggestionsFetchRequested = async ({ value }) => {
        let suggestions = [];

        if (!(this.state.value.length < this.props.minSearchCharacters)) {
            const suggestionsNew = await this.search.getSuggestedKeywords(this.props.maxSuggestions, this.state.value, this.createStrippedFacetName(this.state.selectedCategory));
            const formatFacets = this.formatFacets(this.handleFacets(suggestionsNew.facets), suggestionsNew.suggestions[0]);
            const suggestionsList = this.formatSuggestions(this.state.value.trim(), suggestionsNew.suggestions);
            suggestions = [].concat(suggestionsList.splice(0, 1), formatFacets, suggestionsList);
        }

        const recentSearches = cookieStore.getRecentSearches() || [];
        const recentSuggestions = this.formatSuggestions(this.state.value.trim(), recentSearches);

        const openOverlay = (suggestions.length !== 0) || (recentSuggestions.length !== 0);

        if (openOverlay) {
            this.addCssOverridesForSearchBar();
            this.addCssOverridesForSearchBody();
        }

        this.setState({ suggestions, openOverlay, recentSuggestions }, () => {
            if (!openOverlay) {
                this.removeCssOverridesForSearchBar();
                this.removeCssOverridesForSearchBody();
            }
        });
    };

    onSuggestionsClearRequested = () => {
        this.removeCssOverridesForSearchBar();

        // delay updating the state so the onClick of the X icon is not ignored
        // otherwise, the event handler for the X icon will never execute
        setTimeout(() => this.setState({ openOverlay: false, suggestions: [], recentSuggestions: [] }, () => this.removeCssOverridesForSearchBody()), 125);
    };

    getSuggestionValueCallback = suggestion => suggestion.key;

    renderSuggestionCallback = suggestion => <div>{suggestion.value}</div>;

    createStrippedFacetName = (facetName) => {
        return facetName.replace(/[\W_]+/g, "").toLowerCase();
    }

    handleSuggestionSelected = (event, { suggestionValue, suggestion }) => {
        let { searchCategory, searchContentType } = this.state;
        if (suggestion && suggestion.type === FACET) {
            searchCategory = suggestion.category;
            searchContentType = this.createStrippedFacetName(suggestion.contentType);
        }
        this.removeCssOverridesForSearchBar();
        this.setState({ value: suggestionValue, searchCategory, searchContentType, suggestions: [], openOverlay: false, recentSuggestions: [] }, () => {
            let searchObject = {
                keyword: this.state.value,
            };
            searchObject = !!this.state.searchCategory ? { ...searchObject, category: this.state.searchCategory } : searchObject;
            searchObject = !!this.state.searchContentType ? { ...searchObject, content_type: this.state.searchContentType } : searchObject;

            // clearing search session variables ensures the page position is set to the top after keyword search
            this.search.clearSessionStore();

            this.removeCssOverridesForSearchBody();
            this.search.setUrlParameter(searchObject, this.props.searchPath)
        });
    }

    addCssOverridesForSearchBar = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBar);

    removeCssOverridesForSearchBar = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBar);

    addCssOverridesForSearchBody = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBody);

    removeCssOverridesForSearchBody = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBody);

    formatSuggestions = (term, suggestions) => suggestions.map(suggestion => {
        return {
            key: suggestion,
            type: SUGGESTION,
            value: <span className="formatted-suggestion">{this.formatSuggestion(term, suggestion).reduce((accumulator, currentValue) => <>{accumulator} {currentValue}</>)}</span>
        }
    });

    getFacetStructure = (contentType, category) => (
        <span className="formatted-facet">
            in<span className="white-text">_</span>
            <strong>{contentType}</strong>
            <span className="white-text">_</span>
            in<span className="white-text">_</span>
            {category}
        </span>
    )

    formatFacets = (facets, suggestion = '') => facets.map(facet => {
        const category = facet && facet.category || '';
        const contentType = facet && facet.contenttype || '';
        return {
            key: suggestion,
            category,
            contentType,
            type: FACET,
            value: this.getFacetStructure(contentType, category)
        }
    });

    formatSuggestion = (term, suggestion) => {
        // wrap the matching characters with a pipe | escape all possible regex special characters
        const escapedTerm = term.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        const delimittedSuggestion = suggestion.replace(new RegExp(`\\b${escapedTerm}`, 'ig'), `|${term}|`);

        // convert string to array split with pipe |
        // this will isolate the matching characters into it's own location in the array
        const words = delimittedSuggestion.split('|').filter(word => word !== '');

        // create a new array that will wrap the matching characters into a styled span to highlight
        // non-matching characters will simply display inside a span element
        return words.map(item => item.toLowerCase() === term.toLowerCase() ? this.formatMatchingWord(item, term.length) : this.formatNonMatchingWords(item));
    }

    formatMatchingWord = (word, termLength) => <span className="emphasis-matching-characters">{word.substring(0, termLength)}</span>;

    formatNonMatchingWords = value => {
        // wrap spaces with a pipe | & split into an array
        const words = value.replace(/\s/g, '| |').split('|').filter(word => word !== '');

        // use an underscore instead of a space to preserve the space in the flex row
        // this is needed because IE doesn't handle white-space: pre-wrap the same as other browsers
        // therefore, pre-wrap is not need since we are replacing the space with an underscore
        const formattedWords = words.map(word => word === ' ' ? <span className="white-text">_</span> : <span>{word}</span>);

        return formattedWords.reduce((accumulator, currentValue) => <>{accumulator}{currentValue}</>);
    }

    addSearchBarFocusCss = () => this.searchBarRef.current.classList.add(searchBarFocusClassName);

    removeSearchBarFocusCss = () => this.searchBarRef.current.classList.remove(searchBarFocusClassName);
}

SearchBar.propTypes = {
    baseUrl: PropTypes.string,
    iconClear: PropTypes.string,
    iconSearch: PropTypes.string,
    placeholder: PropTypes.string,
    searchPath: PropTypes.string,
    maxSuggestions: PropTypes.number.isRequired,
    minSearchCharacters: PropTypes.number.isRequired,
    customStyle: PropTypes.string,
    disableOverlay: PropTypes.bool,
    labels: PropTypes.objectOf(PropTypes.string),
    iconDown: PropTypes.string,
}

SearchBar.defaultProps = {
    maxSuggestions: 10,
    minSearchCharacters: 1,
    customStyle: '',
    disableOverlay: false,
}

export default SearchBar;