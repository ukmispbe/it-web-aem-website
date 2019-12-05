import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Modal } from '../modal/index';
import ScreenSizes from '../scripts/screenSizes';
import MobileNav from '../scripts/mobileNav';
import FeedbackSurvey from '../scripts/feedbackSurvey';

import domElements from '../scripts/domElements';
import MyAccountDropDown from './my-account-dropdown';
import cookieStore from '../stores/cookieStore';

const myAccountModalTheme = 'my-account-dropdown';
class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isShown: false,
            isMobile: ScreenSizes.isMobile()
        };

        this.accountHeaderLink = null;
        this.accountHeaderUser = null;
        this.allNavItems = null;
        this.header = null;
    }

    componentDidMount() {
        this.accountHeaderLink = document.querySelector('.top-bar__nav__user .top-bar__nav__user__link.cmp-header-links__link');
        this.accountHeaderUser = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
        this.allNavItems = document.querySelectorAll('.top-bar__nav__item:not(.top-bar__nav__user)');
        this.header = document.querySelector('header.cmp-header');
        const hideOnClick = this.hideOnClick;

        if (this.allNavItems) { 
            Array.from(this.allNavItems).forEach(function (e) { 
                e.addEventListener('click', hideOnClick);
            })
        }

        if (this.accountHeaderUser) { 
            this.accountHeaderUser.addEventListener('mouseover', this.handleOutsideEvent);
            this.accountHeaderUser.addEventListener('mouseleave', this.handleOutsideEvent);
        }

        if (this.accountHeaderLink) { 
            this.accountHeaderLink.addEventListener('click', this.handleOutsideEvent, true);
        }

        window.addEventListener('resize', this.updateViewport, true);
    }

    componentWillUnMount() {
        const hideOnClick = this.hideOnClick;
        if (this.allNavItems) { 
            Array.from(this.allNavItems).forEach(function (e) { 
                e.removeEventListener('click', hideOnClick);
            })
        }

        if (this.accountHeaderUser) { 
            this.accountHeaderUser.removeEventListener('mouseover', this.handleOutsideEvent);
            this.accountHeaderUser.removeEventListener('mouseleave', this.handleOutsideEvent);
        }

        if (this.accountHeaderLink) { 
            this.accountHeaderLink.removeEventListener('click', this.handleOutsideEvent, true);
        }

        window.removeEventListener('resize', this.updateViewport, true);
    }

    updateViewport = () => { 
        if (!ScreenSizes.isMobile()) { 
            if (this.state.isShown == true) {
                this.willShow(false);
            }
        }

        this.setState({
            isMobile : ScreenSizes.isMobile()
        })
    }

    toggleModal = () => {
        this.willShow(!this.state.isShown);
    };

    // TRIGGER CLOSE OF COMPONENT ON CLICK OF OTHER NAV ITEMS IN TOP BAR
    hideOnClick = (e) => {
        if (this.state.isShown == true) { 
            this.willShow(false, e.currentTarget);
        }
    }

    willShow = (newState, caller = 'default') => {
        const headerOverlay = document.querySelector('.cmp-header__overlay.overlay');

        const activeDDClass = 'is-active';
        const activeOverlay = 'active';

        this.setState({ isShown: newState }, () => {
            if (this.state.isShown) {

                const mobileNav = MobileNav();
                if (mobileNav) { 
                    mobileNav.hide();
                }

                this.accountHeaderUser.classList.add(activeDDClass);
                if (!this.state.isMobile) {
                    headerOverlay.classList.add(activeOverlay);
                } else {
                    FeedbackSurvey.isDisplayed(false);
                    domElements.noScroll(true);
                    if (this.header) { 
                        header.classList.add('is-fixed');
                    }
                }
            } else {
                this.accountHeaderUser.classList.remove(activeDDClass);
                if (!this.state.isMobile) {
                    headerOverlay.classList.remove(activeOverlay);
                } else { 
                    if (caller != 'default') {
                        if (caller instanceof HTMLElement) { 
                            if (!caller.classList.contains('top-bar__nav__mobile')) { 
                                // change scrolling unless needed next (ie hamburger menu)
                                //this.mobileNoScroll(false);
                                domElements.noScroll(false);
                                if (this.header) { 
                                    header.classList.remove('is-fixed');
                                }
                                FeedbackSurvey.isDisplayed(true);
                            }
                        }
                    } else { 
                        //this.mobileNoScroll(false);
                        domElements.noScroll(false);
                        if (this.header) { 
                            header.classList.remove('is-fixed');
                        }
                        FeedbackSurvey.isDisplayed(true);
                    }

                }
            }
        });
    };

    handleOutsideEvent = e => { 
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {

            e.preventDefault();
            switch (true) { 
                case e.type == 'mouseover' && !this.state.isMobile:
                        this.willShow(true);
                    break;
                case e.type == 'click' && this.state.isMobile:
                        e.preventDefault();
                        this.toggleModal();
                    break;
                case e.type == 'mouseleave' && !this.state.isMobile:
                        this.willShow(false);
                    break;            
            }
        }
    }

    render() {

        const newConfig = Object.assign({}, this.props.config);
        newConfig.loginStatus = {
            state: cookieStore.getLoggedInStatus(),
            userName: cookieStore.getGreeting(),
            accountName: '',
            accountNumber: ''
        };
            
        return (
            <>
                {this.state.isMobile ? (
                    <Modal
                        toggleModal={this.toggleModal}
                        open={this.state.isShown}
                        theme={myAccountModalTheme}
                        config={newConfig}
                        myAccountClickHandler={this.handleClick}
                    />
                ) : (
                    <MyAccountDropDown config={newConfig} />
                )}
            </>
        )
    }
}

MyAccount.propTypes = {
    config: PropTypes.object.isRequired,
};

export default MyAccount;
export { myAccountModalTheme };