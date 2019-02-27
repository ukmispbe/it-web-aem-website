import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import './../../styles/index.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        const searchValue = this.getUrlParameter('keyword');
        this.state = { value: searchValue ? searchValue : '' };
        this.handleInput = this.handleInput.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
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
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm =  this.state.value ? this.state.value : '*:*';
            window.location.href = `${this.props.searchPath}?keyword=${
                searchTerm
            }`;
        }
    };

    render() {
        const props = this.props;
        return (
            <form className="cmp-search-bar" id="notesSearch">
                <input
                    className="cmp-search-bar__input"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleInput}
                    onKeyDown={this._handleKeyPress}
                    placeholder={this.props.placeholder}
                />
                <ReactSVG />
            </form>
        );
    }
}

export default SearchBar;
