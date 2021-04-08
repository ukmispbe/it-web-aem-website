import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'throttle-debounce';
import { SearchService } from '../services/index';
import OverLay from './overlay';
import PropTypes from 'prop-types';
import screenSizes from "../../scripts/screenSizes";
import loginStatus from "../../scripts/loginStatus";
import cookieStore from '../../stores/cookieStore';
import { isEprocurementUser, getIsoCode } from '../../utils/userFunctions';

const cssOverridesForSearchBar = "cmp-search-bar__auto-suggest--open";
const cssOverridesForSearchBody = "cmp-search-body__auto-suggest--open";
const searchBarFocusClassName = 'cmp-search-bar--focus';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.inputElement = null;

        this.eprocIsoCode = '';

        this.searchBarRef = React.createRef();

        this.search = this.updateSearchService(isEprocurementUser() ? getIsoCode(): this.props.isocode);

        let searchValue = this.search.getUrlParameter('keyword', window.location.search.substring(1)); 

        if (this.search.isDefaultKeyword(searchValue)) searchValue = '';

        this.state = {
            value: searchValue ? searchValue : '',
            suggestions: [],
            openOverlay: false,
            placeholder: screenSizes.isMobile() ? this.props.placeholderMobile : this.props.placeholderTablet,
            recentSearches: cookieStore.getRecentSearches() || []
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

    render() {
        return (
            <>
                {!this.props.disableOverlay && <OverLay isOpen={this.state.openOverlay} />}
                <div ref={this.searchBarRef} className={`cmp-search-bar ${this.props.customStyle}`} id="notesSearch" onClick={this.handleAutosuggestClick}>
                    {this.renderAutoSuggest()}
                    <div className="cmp-search-bar__icons">
                        {this.renderHideClearIcon()}
                        {this.renderSearchIcon()}
                    </div>
                </div>
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

    renderAutoSuggest = () => {
        const inputProps = {
            placeholder: this.state.placeholder,
            value: this.state.value,
            onChange: this.handleSearchValueChange ,
            onKeyPress: this.handleSearchValuePress,
            onBlur: this.handleSearchValueBlur,
            'aria-label': this.props.labels.autoSuggest
        };
        
        if(isEprocurementUser() && !this.eprocIsoCode) {
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

    renderHideClearIcon = () => (this.state.value) ? this.renderClearIcon() : <></>;

    renderClearIcon = () => <button aria-label={this.props.labels.clear} onClick={e => this.handleClearIconClick(e)} onMouseDown={e => e.preventDefault()} className="clear-icon"><ReactSVG src={this.props.iconClear} className="cmp-search-bar__icons-clear" /></button>

    renderSearchIcon = () => <button aria-label={this.props.labels.search} onClick={e => this.handleSearchIconClick(e)} onMouseDown={e => e.preventDefault()} className="search-icon"><ReactSVG aria-hidden="true" src={this.props.iconSearch} className="cmp-search-bar__icons-search" /></button>;

    // Update searchbar placeholder message depending on the view and window size
    handleViewChange = () => {
        if(screenSizes.isMobile() && this.state.placeholder!==this.props.placeholderMobile) {
            this.setState({placeholder: this.props.placeholderMobile});
        } else if(!screenSizes.isMobile() && this.state.placeholder!==this.props.placeholderTablet) {
            this.setState({placeholder: this.props.placeholderTablet})
        }
    }

    handleAutosuggestClick = (e) => {
        if(Array.from(e.target.classList).find(element => element === 'react-autosuggest__input--focused')) {
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
            {value: '', suggestions: [], openOverlay: !!this.state.recentSuggestions.length}, 
            () => !this.state.recentSuggestions.length && this.removeCssOverridesForSearchBody()
        );
    }

    handleSearchValueChange = (event, { newValue }) => {
        if(newValue.length === 0 && !this.state.recentSuggestions.length) {
            // this will prevent white space from appearing below the search bar
            // as the user backspaces and deletes all of the characters
            this.removeCssOverridesForSearchBar();
        }
        
        this.setState({value: newValue}, () => {
            if(newValue.length === 0) {
                // the user has manually cleared the search bar so need to update the state
                this.setState({suggestions: [], openOverlay: !!this.state.recentSuggestions.length || false}, () => !(!!this.state.recentSuggestions.length || false) && this.removeCssOverridesForSearchBody());
            }
        });
    }

    handleSearchValueBlur = (event, { highlightedSuggestion }) => this.removeSearchBarFocusCss();

    handleSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = !(this.state.value.length < this.props.minSearchCharacters) 
            ? this.formatSuggestions(this.state.value.trim(), (await this.search.getSuggestedKeywords(this.props.maxSuggestions, this.state.value)))
            : [];
        const recentSearches = cookieStore.getRecentSearches() || [];
        const recentSuggestions = this.formatSuggestions(this.state.value.trim(), recentSearches);
        
        const openOverlay = (suggestions.length !== 0) || (recentSuggestions.length !== 0);

        if(openOverlay) {
            this.addCssOverridesForSearchBar();
            this.addCssOverridesForSearchBody();
        }

        this.setState({suggestions, openOverlay, recentSuggestions}, () => {
            if(!openOverlay) {
                this.removeCssOverridesForSearchBar();
                this.removeCssOverridesForSearchBody();
            }
        });
    };

    onSuggestionsClearRequested = () => {
        this.removeCssOverridesForSearchBar();
        
        // delay updating the state so the onClick of the X icon is not ignored
        // otherwise, the event handler for the X icon will never execute
        setTimeout(() => this.setState({openOverlay: false, suggestions: [], recentSuggestions: []}, () => this.removeCssOverridesForSearchBody()), 125);
    };

    getSuggestionValueCallback = suggestion => suggestion.key;

    renderSuggestionCallback = suggestion => <div>{suggestion.value}</div>;

    handleSuggestionSelected = (event, { suggestionValue}) => {
        this.removeCssOverridesForSearchBar();
        this.setState({value: suggestionValue, suggestions: [], openOverlay: false, recentSuggestions: []}, () => {
            // clearing search session variables ensures the page position is set to the top after keyword search
            this.search.clearSessionStore();
            
            this.removeCssOverridesForSearchBody();
            this.search.setUrlParameter(this.state.value, this.props.searchPath)
        });
    }

    addCssOverridesForSearchBar = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBar);

    removeCssOverridesForSearchBar = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBar);

    addCssOverridesForSearchBody = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBody);

    removeCssOverridesForSearchBody = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBody);

    formatSuggestions = (term, suggestions) => suggestions.map(suggestion => {
        return {
            key: suggestion,
            value: <span className="formatted-suggestion">{this.formatSuggestion(term, suggestion).reduce((accumulator, currentValue) => <>{accumulator} {currentValue}</>)}</span>
        }
    });

    formatSuggestion = (term, suggestion) =>{
        // wrap the matching characters with a pipe | and no action in case search term is '*'
        const delimittedSuggestion = term !== '*' ? suggestion.replace(new RegExp(`\\b${term}`, 'ig'), `|${term}|`) : suggestion.replace(new RegExp("\\b".concat(""), 'ig'), "|".concat("", "|"));

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

        return formattedWords.reduce((accumulator, currentValue) => <>{accumulator}{currentValue}</> );
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
    labels: PropTypes.objectOf(PropTypes.string)
}

SearchBar.defaultProps = {
    maxSuggestions: 10,
    minSearchCharacters: 1,
    customStyle: '',
    disableOverlay: false,
}

export default SearchBar;