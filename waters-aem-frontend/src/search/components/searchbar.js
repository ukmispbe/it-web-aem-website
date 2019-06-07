import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'throttle-debounce';
import { SearchService } from '../services/index';
import OverLay from './overlay';
import PropTypes from 'prop-types';
import './../../styles/index.scss';

const cssOverridesForSearchBar = "cmp-search-bar__auto-suggest--open";
const cssOverridesForSearchBody = "cmp-search-body__auto-suggest--open";
const searchBarFocusClassName = 'cmp-search-bar--focus';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.inputElement = null;

        this.searchBarRef = React.createRef();

        this.search = new SearchService(
            this.props.isocode,
            this.props.searchServicePath,'', this.props.baseUrl);

        let searchValue = this.search.getUrlParameter('keyword', window.location.search.substring(1)); 

        if (this.search.isDefaultKeyword(searchValue)) searchValue = '';

        this.state = { value: searchValue ? searchValue : '', suggestions: [], openOverlay: false};

        this.handleSuggestionsFetchRequestedDebounce = debounce(250, this.handleSuggestionsFetchRequested);
    }

    componentDidMount = () => {
        this.inputElement = document.querySelectorAll('.cmp-search-bar .react-autosuggest__container .react-autosuggest__input')[0];
    }

    render() {
        return (
            <>
                <OverLay isOpen={this.state.openOverlay} />
                <div ref={this.searchBarRef} className="cmp-search-bar" id="notesSearch" onClick={this.handleAutosuggestClick}>
                    {this.renderAutoSuggest()}
                    <div className="cmp-search-bar__icons">
                        {this.renderHideClearIcon()}
                        {this.renderSearchIcon()}
                    </div>
                </div>
            </>
        );
    }

    renderAutoSuggest = () => {
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this.handleSearchValueChange ,
            onKeyPress: this.handleSearchValuePress,
            onBlur: this.handleSearchValueBlur
        };

        return <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedDebounce}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.handleSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValueCallback}
                    renderSuggestion={this.renderSuggestionCallback}
                    inputProps={inputProps}/>;
    };

    renderHideClearIcon = () => (this.state.value) ? this.renderClearIcon() : <></>;

    renderClearIcon = () => <ReactSVG src={this.props.iconClear} className="cmp-search-bar__icons-clear" onClick={e => this.handleClearIconClick(e)}/>

    renderSearchIcon = () => <ReactSVG src={this.props.iconSearch} className="cmp-search-bar__icons-search" onClick={e => this.handleSearchIconClick(e)} />;

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
        this.setState({value: '', suggestions: [], openOverlay: false}, () => this.removeCssOverridesForSearchBody());
    }

    handleSearchValueChange = (event, { newValue }) => {
        if(newValue.length === 0) {
            // this will prevent white space from appearing below the search bar
            // as the user backspaces and deletes all of the characters
            this.removeCssOverridesForSearchBar();
        }
        
        this.setState({value: newValue}, () => {
            if(newValue.length === 0) {
                // the user has manually cleared the search bar so need to update the state
                this.setState({suggestions: [], openOverlay: false}, () => this.removeCssOverridesForSearchBody());
            }
        });
    }

    handleSearchValueBlur = (event, { highlightedSuggestion }) => this.removeSearchBarFocusCss();

    handleSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = !(this.state.value.length < this.props.minSearchCharacters) 
            ? this.formatSuggestions(this.state.value.trim(), (await this.search.getSuggestedKeywords(this.props.maxSuggestions, this.state.value)))
            : [];
        
        const openOverlay = suggestions.length !== 0;

        if(openOverlay) {
            this.addCssOverridesForSearchBar();
            this.addCssOverridesForSearchBody();
        }

        this.setState({suggestions, openOverlay}, () => {
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
        setTimeout(() => this.setState({openOverlay: false, suggestions: []}, () => this.removeCssOverridesForSearchBody()), 125);
    };

    getSuggestionValueCallback = suggestion => suggestion.key;

    renderSuggestionCallback = suggestion => <div>{suggestion.value}</div>;

    handleSuggestionSelected = (event, { suggestionValue}) => {
        this.removeCssOverridesForSearchBar();
        this.setState({value: suggestionValue, suggestions: [], openOverlay: false}, () => {
            // removing these session variables ensures the page position is set to the top after keyword search
            window.sessionStorage.removeItem('waters.previousPaginationClick');
            window.sessionStorage.removeItem('waters.previousPagePosition');
            
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
        // wrap the matching characters with a pipe |
        const delimittedSuggestion = suggestion.replace(new RegExp(`\\b${term}`, 'ig'), `|${term}|`);

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
    minSearchCharacters: PropTypes.number.isRequired
}

SearchBar.defaultProps = {
    maxSuggestions: 10,
    minSearchCharacters: 1
}

export default SearchBar;