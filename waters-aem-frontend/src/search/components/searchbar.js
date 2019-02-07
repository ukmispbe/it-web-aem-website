import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import './../../styles/index.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({ value: e.target.value });
    }

    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('submit search to', this.props.searchPath);
            window.location.href = `${this.props.searchPath}?keyword=${
                this.state.value
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
