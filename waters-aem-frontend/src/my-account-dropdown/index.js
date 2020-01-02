import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal, { Header, keys } from '../utils/modal';
import ScreenSizes from '../scripts/screenSizes';
import MobileNav from '../scripts/mobileNav';
import domElements from '../scripts/domElements';
import MyAccountContainer from './my-account-container';
import SessionStore from '../stores/sessionStore';
import loginStatus from '../scripts/loginStatus';
import UserDetails from '../my-account/services/UserDetails';
import SoldToDetails from '../my-account/services/SoldToDetails';

const myAccountModalTheme = 'my-account-dropdown';
class MyAccountDropDown extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isShown: false,
            isMobile: ScreenSizes.isMobile()
        };

        this.accountHeaderUser = null;
        this.allNavItems = null;
        this.header = null;

        this.newConfig = Object.assign({}, this.props.config, {
            loginState: loginStatus.state(),
            userDetails : {
                userName: '',
                accountName: '',
                accountNumber: ''
            }
        });
    }

    componentDidMount() {
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
            this.accountHeaderUser.addEventListener('click', this.handleOutsideEvent);
        }

        window.addEventListener('resize', this.updateViewport, true);

        if (loginStatus.state()) { 
            this.retrieveUserDetails();
        }
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
            this.accountHeaderUser.removeEventListener('click', this.handleOutsideEvent);
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
                                domElements.noScroll(false);
                                if (this.header) { 
                                    header.classList.remove('is-fixed');
                                }
                            }
                        }
                    } else {
                        domElements.noScroll(false);
                        if (this.header) { 
                            header.classList.remove('is-fixed');
                        }
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
                case e.type == 'click' && !this.state.isMobile:
                        e.preventDefault();
                        if (this.props.config.myAccount.url && this.props.config.myAccount.target) { 
                            window.open(this.props.config.myAccount.url, this.props.config.myAccount.target);
                        }
                    break;
                case e.type == 'mouseleave' && !this.state.isMobile:
                        this.willShow(false);
                    break;            
            }
        }
    }

    retrieveUserDetails = () => { 
            const sessionStore = new SessionStore();
            /*
                START TEMPORARY CODE --
    
                Please use this code below until sign-in complete and user token is stored in session storage 
                & User Details service is updated to use that token
            */
                sessionStore.setUserToken('wendy_batista@waters.com')   
            //END TEMPORARY CODE

            if (this.props.config.soldToDetailsUrl) {
                const soldToDetails = new SoldToDetails(this.props.config.soldToDetailsUrl)
                soldToDetails
                    .then((response) => {
                        const priorityAccount = response[0]

                        if (priorityAccount.company) {
                            this.newConfig.userDetails.accountName = priorityAccount.company + ' ';
                        }

                        if (priorityAccount.soldTo) {
                            this.newConfig.userDetails.accountNumber = priorityAccount.soldTo;
                        }
                    }).catch(err => {
                        console.log(err.message)
                    });
    
            }
            
            if (this.props.config.userDetailsUrl) { 
                const userDetails = new UserDetails(this.props.config.userDetailsUrl);
                userDetails
                    .then((response) => { 
                        if (response.firstName && response.lastName) { 
                            this.newConfig.userDetails.userName = response.firstName + ' ' + response.lastName;;
                        }
                    }).catch(err => {
                        console.log(err.message)
                    });
            }
    }

    render() {

        return (
            <>
                {this.state.isMobile ? (
                    <Modal isOpen={this.state.isShown} className={keys.ModalWithSiteNavOnMobile} onClose={this.toggleModal}>
                        <Header title={this.newConfig.title} />
                        <MyAccountContainer config={this.newConfig} />
                    </Modal>
                ) : (
                    <MyAccountContainer config={this.newConfig} />
                )}
            </>
        )
    }
}

MyAccountDropDown.propTypes = {
    config: PropTypes.object.isRequired,
};

export default MyAccountDropDown;
export { myAccountModalTheme };