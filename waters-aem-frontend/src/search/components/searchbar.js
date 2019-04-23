import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Autosuggest from 'react-autosuggest';
import { SearchService } from '../services/index';
import OverLay from './overlay';
import './../../styles/index.scss';

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

        this.state = { value: searchValue ? searchValue : '', suggestions, openOverlay: false};
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
            this.setState({suggestions: [], openOverlay: false})
        }
    };

    _clearSearchVal = e => {
        const querystringParams = this.search.getParamsFromString();

        if (!querystringParams.keyword || querystringParams.keyword === '*:*') {
            // no keyword have been selected so no need to reload page
            // simply clear out the search value and suggestions array
            this.setState({value: '', suggestions: [], openOverlay: false});
        } else {
            // keyword has been selected so need to reload page
            // and clear the state of the component
            this.setState({ value: '', suggestions: [], openOverlay: false}, () => {
                this.setUrlParamter();
            });
        }
    };

    render() {
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this.onChange ,
            onKeyPress: this._handleKeyPress
        };

        return (
            <>
                <OverLay isOpen={this.state.openOverlay} />
                <div className="cmp-search-bar" id="notesSearch">
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
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
                </div>
            </>
        );
    }

    onChange = (event, { newValue }) => {
        this.setState({value: newValue});
    };

    onSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = await this.search.getSuggestedKeywords(value);

        this.setState({suggestions, openOverlay: true});
    };

    onSuggestionsClearRequested = () => { 
        // need to delay this when users click on the clear icon in the search textbox
        setTimeout(() => {
            this.setState({suggestions: [], openOverlay: false});
        }, 125);
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({value: suggestionValue, openOverlay: false}, () => {
            this.setUrlParamter();
        });
    }

    getSuggestionValue = suggestion => suggestion.name;

    renderSuggestion = suggestion => <div>{this.formatSuggesion(suggestion.name)}</div>;

    formatSuggesion = name => <><span className="emphasis-matching-characters">{name.substring(0, this.state.value.length)}</span>{name.substring(this.state.value.length, name.length)}</>;
}

export default SearchBar;
