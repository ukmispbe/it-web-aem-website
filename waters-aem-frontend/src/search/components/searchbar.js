import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'throttle-debounce';
import { SearchService } from '../services/index';
import SessionService from '../services/session-service';
import OverLay from './overlay';
import PropTypes from 'prop-types';
import './../../styles/index.scss';

const cssOverridesClassName = "cmp-search-bar__auto-suggest--open";
const searchBarFocusClassName = 'cmp-search-bar--focus';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.searchBarRef = React.createRef();

        this.search = new SearchService({path: this.props.baseUrl});

        this.sessionService = new SessionService();

        let searchValue = this.search.getUrlParameter('keyword', window.location.search.substring(1)); 

        if (this.search.isDefaultKeyword(searchValue)) searchValue = '';

        this.state = { value: searchValue ? searchValue : '', suggestions: [], openOverlay: false};

        this.handleSuggestionsFetchRequestedDebounce = debounce(250, this.handleSuggestionsFetchRequested);
    }

    componentDidMount = () => {
        const querystringParams = this.search.getParamsFromString();

        if (!querystringParams.keyword || this.search.isDefaultKeyword(querystringParams.keyword)) {
            const searchTerm = this.sessionService.getSearchTerm();

            if (searchTerm) {
                this.setState({value: searchTerm}, () => this.search.setUrlParameter(this.state.value, this.props.searchPath));
            }
        }
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

        return(<Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedDebounce}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    onSuggestionSelected={this.handleSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValueCallback}
                    renderSuggestion={this.renderSuggestionCallback}
                    inputProps={inputProps}/>);
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
        const querystringParams = this.search.getParamsFromString();

        if (!querystringParams.keyword || this.search.isDefaultKeyword(querystringParams.keyword)) {
            // no keyword has been selected so no need to reload page
            this.setState({value: '', suggestions: [], openOverlay: false});
        } else if(querystringParams.keyword === this.state.value.toLowerCase()) {
            // keyword has been selected and search term has not changed 
            // so need to remove search term from session and reload page
            this.sessionService.removeSearchTerm();

            this.setState({ value: '', suggestions: [], openOverlay: false}, () => this.search.setUrlParameter(this.state.value, this.props.searchPath));
        } else {
            // keyword has been selected and search term has changed so no need to reload page
            // simply reset the search term with the previously selected search term
            this.setState({value: querystringParams.keyword, suggestions: [], openOverlay: false});
        }
    };

    handleSearchValueChange = (event, { newValue }) => this.setState({value: newValue});

    handleSearchValueBlur = (event, { highlightedSuggestion }) => this.removeSearchBarFocusCss();

    handleSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = !(value.length < this.props.minSearchCharacters) 
            ? this.formatSuggestions(value.trim(), (await this.search.getSuggestedKeywords(this.props.maxSuggestions, value)))
            : [];

        const openOverlay = suggestions.length !== 0;

        if (openOverlay) {
            this.addCssOverrides();
        } else {
            this.removeCssOverrides();
        }

        this.setState({suggestions, openOverlay});
    };

    handleSuggestionsClearRequested = () => { 
        // when user clicks on the clear icon, this function should execute after the icon's click event
        // therefore, need to delay this when users click on the clear icon otherwise the clear icon
        // click event will never execute because this function will eventually prevent propagation
        setTimeout(() => this.setState({suggestions: [], openOverlay: false}), 125);

        this.removeCssOverrides();
    };

    getSuggestionValueCallback = suggestion => suggestion.key;

    renderSuggestionCallback = suggestion => <div>{suggestion.value}</div>;

    handleSuggestionSelected = (event, { suggestionValue}) => {
        this.sessionService.setSearchTerm(suggestionValue);

        this.setState({value: suggestionValue, openOverlay: false}, () => this.search.setUrlParameter(this.state.value, this.props.searchPath));
    }

    addCssOverrides = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesClassName);

    removeCssOverrides = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesClassName);

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
        return words.map(item => item.toLowerCase() === term.toLowerCase() ? this.formatWord(item, term.length) : <span>{item}</span>);
    }

    formatWord = (word, termLength) => <span className="emphasis-matching-characters">{word.substring(0, termLength)}</span>;

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