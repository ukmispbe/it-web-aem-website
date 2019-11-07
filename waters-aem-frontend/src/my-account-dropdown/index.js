import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MyAccountDropDownList from './my-account-dropdown-list';
import { Modal } from '../modal/index';
import LoginStatus from '../scripts/loginStatus';
import ScreenSizes from '../scripts/screenSizes';
import MobileNav from '../scripts/mobileNav';
import FeedbackSurvey from '../scripts/feedbackSurvey';


class MyAccountDropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isShown: false,
            modalConfig: this.props.config.modalInfo,
            isMobile: ScreenSizes.isMobile()
        };
    }

    componentDidMount() {
        const accountHeaderLink = document.querySelector('.top-bar__nav__user .top-bar__nav__user__link.cmp-header-links__link');
        const accountHeaderUser = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
        const allNavItems = document.querySelectorAll('.top-bar__nav__item:not(.top-bar__nav__user)');
        const hideOnClick = this.hideOnClick;
        Array.from(allNavItems).forEach(function (e) { 
            e.addEventListener('click', hideOnClick);
        })

        accountHeaderUser.addEventListener('mouseover', this.handleOutsideEvent);
        accountHeaderUser.addEventListener('mouseleave', this.handleOutsideEvent);
        accountHeaderLink.addEventListener('click', this.handleOutsideEvent, true);
        window.addEventListener('resize', this.updateViewport, true);
    }

    componentWillUnMount() {
        const accountHeaderLink = document.querySelector('.top-bar__nav__user .top-bar__nav__user__link.cmp-header-links__link');
        const accountHeaderUser = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
        const allNavItems = document.querySelector('.top-bar__nav__item:not(.top-bar__nav__user)');
        const hideOnClick = this.hideOnClick;
        Array.from(allNavItems).forEach(function (e) { 
            e.removeEventListener('click', hideOnClick);
        })

        accountHeaderUser.removeEventListener('mouseover', this.handleOutsideEvent);
        accountHeaderUser.removeEventListener('mouseleave', this.handleOutsideEvent);
        accountHeaderLink.removeEventListener('click', this.handleOutsideEvent, true);
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
        const accountHeaderUser = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');

        const activeDDClass = 'is-active';
        const activeOverlay = 'active';

        this.setState({ isShown: newState }, () => {
            if (this.state.isShown) {

                const mobileNav = MobileNav();
                if (mobileNav) { 
                    mobileNav.hide();
                }

                accountHeaderUser.classList.add(activeDDClass);
                if (!this.state.isMobile) {
                    headerOverlay.classList.add(activeOverlay);
                } else {
                    FeedbackSurvey.isDisplayed(false);
                    this.mobileNoScroll(true);
                }
            } else {
                accountHeaderUser.classList.remove(activeDDClass);
                if (!this.state.isMobile) {
                    headerOverlay.classList.remove(activeOverlay);
                } else { 
                    if (caller != 'default') {
                        if (caller instanceof HTMLElement) { 
                            if (!caller.classList.contains('top-bar__nav__mobile')) { 
                                // change scrolling unless needed next (ie hamburger menu)
                                this.mobileNoScroll(false);
                                FeedbackSurvey.isDisplayed(true);
                            }
                        }
                    } else { 
                        this.mobileNoScroll(false);
                        FeedbackSurvey.isDisplayed(true);
                    }

                }
            }
        });
    };

    mobileNoScroll = toggle => { 
        const header = document.querySelector('header.cmp-header');
        if (toggle) {
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
            header.classList.add('is-fixed');
        } else { 
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
            header.classList.remove('is-fixed');
        }
    }

    handleOutsideEvent = e => { 
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {

            e.preventDefault();
            let loggedIn = LoginStatus.state();

            if (loggedIn) {
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
            } else { 
                if (e.type == 'click') { 
                    //click out when not logged in
                    if (e.currentTarget.dataset.loginUrl) {
                        window.open(e.currentTarget.dataset.loginUrl, e.currentTarget.target);
                    }
                }
            }
        }
    }
    
    desktopView = () => { 
        if (this.state.modalConfig) {
            const list = this.state.modalConfig.list;
            if (list) {
                return (
                    <ul className="account-dropdown dropdown__list">
                        <MyAccountDropDownList
                            listItems={list}
                        />
                    </ul>
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
                open={this.state.isShown}
                theme="account-dropdown"
                config={this.state.modalConfig}
                myAccountClickHandler={this.handleClick}
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

MyAccountDropDown.propTypes = {
    config: PropTypes.object.isRequired,
};

export default MyAccountDropDown;