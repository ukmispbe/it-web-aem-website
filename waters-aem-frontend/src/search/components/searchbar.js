import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { SearchService } from '../services/index';
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

        let searchValue = this.getUrlParameter('keyword', window.location.search.substring(1));

        if (searchValue === '*:*') searchValue = '';

        this.state = { value: searchValue ? searchValue : '', suggestions: [], openOverlay: false};
    }

    getUrlParameter = (sParam, sPageURL) => {
        const sURLVariables = sPageURL.split('&');

        for (let i = 0; i < sURLVariables.length; i++) {
            const sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined
                    ? true
                    : decodeURIComponent(sParameterName[1]);
            }
        }
    }

    setUrlParameter = () => {
        const parameters = this.buildParameters(this.state.value);
        const querystring = this.stringifyParameters(parameters);

        window.location.href = `${this.props.searchPath}?${querystring}`;
    }

    buildParameters = (searchValue) => {
        const keyword = searchValue ? searchValue : '*:*';
        const sort = keyword === '*:*' ? 'most-recent' : 'most-relevant';

        return { keyword, sort };
    }

    stringifyParameters = (parameters) => (Object.keys(parameters).length !== 0)
            ? Object.keys(parameters).reduce((accumulator, currentValue) => 
                `${accumulator}=${parameters[accumulator]}&${currentValue}=${parameters[currentValue]}`)
            : '';

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
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
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

        if (!querystringParams.keyword || querystringParams.keyword === '*:*') {
            // no keyword have been selected so no need to reload page
            // simply clear out the search value and suggestions array
            this.setState({value: '', suggestions: [], openOverlay: false});
        } else {
            // keyword has been selected so need to reload page
            // and clear the state of the component
            this.setState({ value: '', suggestions: [], openOverlay: false}, () => this.setUrlParameter());
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

    handleSuggestionSelected = (event, { suggestionValue}) => this.setState({value: suggestionValue, openOverlay: false}, () => this.setUrlParameter());

    addCssOverrides = () => document.getElementsByTagName('body')[0].classList.add(cssOverridesClassName);

    removeCssOverrides = () => document.getElementsByTagName('body')[0].classList.remove(cssOverridesClassName);

    formatSuggestions = (term, suggestions) => suggestions.map(suggestion => {
        return {
            key: suggestion,
            value: this.formatSuggestion(term, suggestion).reduce((accumulator, currentValue) => <>{accumulator} {currentValue}</>)
        }
    });

    formatSuggestion = (term, suggestion) => suggestion.split(' ').map(item => item.startsWith(term) ? this.formatWord(item, term.length) : <>{item}</>);

    formatWord = (word, termLength) => <><span className="emphasis-matching-characters">{word.substring(0, termLength)}</span>{word.substring(termLength, word.length)}</>;

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
    minSearchCharacters: 3
}

export default SearchBar;