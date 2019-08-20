// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AccountDropDownList from './account-dropdown-list';
import { Modal } from '../modal/index';
import LoginStatus from '../scripts/loginStatus';
import ScreenSizes from '../scripts/screenSizes';




class AccountDropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalShown: false,
            modalConfig: this.props.config.modalInfo,
            isMobile: ScreenSizes.isMobile()
        };

        
    }

    componentDidMount() {
        const accountHeaderBtn = document.querySelector('.top-bar__nav__user .top-bar__nav__user__link.cmp-header-links__link');
        accountHeaderBtn.addEventListener('click', this.handleClickOutside, true);
        window.addEventListener('resize', this.updateViewport, true);
    }

    componentWillUnMount() {
        const accountHeaderBtn = document.querySelector('.top-bar__nav__user .top-bar__nav__user__link.cmp-header-links__link');
        accountHeaderBtn.removeEventListener('click', this.handleClickOutside, true)
        window.removeEventListener('resize', this.updateViewport, true);
    }

    updateViewport = () => { 
        this.setState({
            isMobile : ScreenSizes.isMobile()
        })
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => {
            if (this.state.modalShown) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    };

    handleClickOutside = event => { 
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            if (LoginStatus.state()) { 

                if (this.state.isMobile) {
                    this.toggleModal();
                }
                
            }
        }
    }
    
    desktopView = () => { 
        if (this.state.modalConfig) {
            const list = this.state.modalConfig.list;
            if (list) {
                const listItems = AccountDropDownList(list);

                return (
                    <ul className="account-dropdown dropdown__list">{listItems}</ul>
                )
            } else {
                return null;
            }
        } else { 
            return null;
        }
    }
    
    mobileView = () => { 
        return (
            <Modal
                toggleModal={this.toggleModal}
                open={this.state.modalShown}
                theme="account-dropdown"
                config={this.state.modalConfig}
            />
        );
     }

                

    render() {

        return (<>
                {this.state.isMobile ? this.mobileView() : this.desktopView()}
            </>
        )
    }
}

AccountDropDown.propTypes = {
    config: PropTypes.object.isRequired,
};

export default AccountDropDown;
