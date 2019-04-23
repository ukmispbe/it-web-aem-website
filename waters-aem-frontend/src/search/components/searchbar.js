import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { SearchService } from '../services/index';
import './../../styles/index.scss';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
      name: 'Metabolites',
      year: 1972
    },
    {
      name: 'Method',
      year: 2012
    },
  ];
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

class SearchBar extends Component {
    constructor(props) {
        super(props);

        // TODO: pass in props from AEM component
        this.search = new SearchService(
            this.props.searchDefaults,
            this.props.defaultFacet,
            this.props.searchServicePath
        );

        let searchValue = this.getUrlParameter('keyword');

        if (searchValue === '*:*') searchValue = '';

        let suggestions = [];

        this.state = { value: searchValue ? searchValue : '', suggestions};

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({ value: e.target.value });
    }

    getUrlParameter(sParam) {
        const sPageURL = window.location.search.substring(1);
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

    setUrlParamter() {
        const searchTerm = this.state.value ? this.state.value : '*:*';
        const defaultSort = searchTerm === '*:*' ? 'most-recent' : 'most-relevant';
        window.location.href = `${
            this.props.searchPath
        }?keyword=${searchTerm}&sort=${defaultSort}`;
    }

    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setUrlParamter();
        }
    };

    _clearSearchVal = e => {
        const querystringParams = this.search.getParamsFromString();

        if (!querystringParams.keyword || querystringParams.keyword === '*:*') {
            // no keyword have been selected so no need to reload page
            // simply clear out the search value and suggestions array
            this.setState({value: '', suggestions: []});
        } else {
            // keyword has been selected so need to reload page
            // and clear the state of the component
            this.setState({ value: '', suggestions: []}, () => {
                this.setUrlParamter();
            });
        }
    };

    render() {
        const props = this.props;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this.onChange
        };

        return (
            <>
                <form className="cmp-search-bar" id="notesSearch">
                    {/* <input
                        className="cmp-search-bar__input"
                        type="text"
                        value={this.state.value}
                        onChange={this.handleInput}
                        onKeyDown={this._handleKeyPress}
                        placeholder={this.props.placeholder}
                    />
                    {!this.state.value && (
                        <ReactSVG
                            src={this.props.iconSearch}
                            className="cmp-search-bar__icon-search"
                        />
                    )}
                    {this.state.value && (
                        <ReactSVG
                            src={this.props.iconClear}
                            className="cmp-search-bar__icon-search--clear"
                            onClick={e => this._clearSearchVal(e)}
                        />
                    )} */}
                    {/* <div className="cmp-search-bar__autosuggest-wrapper">
                        
                    </div> */}
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}/>
                    
                    <div className="cmp-search-bar__icons">
                        {this.state.value && (
                            <ReactSVG
                                src={this.props.iconClear}
                                className="cmp-search-bar__icons-clear"
                                onClick={e => this._clearSearchVal(e)}
                            />
                        )}

                        <ReactSVG
                            src={this.props.iconSearch}
                            className="cmp-search-bar__icons-search"/>
                    </div>
                </form>
            </>
        );
    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };
    
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => { /* leave the body empty */ };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({value: suggestionValue}, () => {
            this.setUrlParamter();
        });
    }
}

export default SearchBar;
