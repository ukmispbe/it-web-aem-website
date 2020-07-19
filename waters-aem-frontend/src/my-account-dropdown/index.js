import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal, { Header, keys } from '../utils/modal';
import ScreenSizes from '../scripts/screenSizes';
import MobileNav from '../scripts/mobileNav';
import domElements from '../scripts/domElements';
import MyAccountContainer from './my-account-container';
import loginStatus from '../scripts/loginStatus';
import UserDetailsLazy from '../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../my-account/services/SoldToDetailsLazy';
import SessionStore from '../stores/sessionStore';
import LocalStore from '../stores/localStore';
import { getAddressesByType } from '../detail-tiles/utils/profileFormatter';
import punchoutLogin from '../my-account/services/PunchoutLogin';
import punchoutSetup from '../my-account/services/PunchoutSetup';
import parseQueryParams from '../utils/parse-query-params';
import removeQString from '../utils/remove-query-string';
import buildUrl from '../utils/buildUrl';

const myAccountModalTheme = 'my-account-dropdown';
class MyAccountDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false,
            isMobile: ScreenSizes.isMobile(),
            config: {
                ... this.props.config,
                loginState: loginStatus.state(),
                userDetails: {
                    userName: '',
                    accountName: ''
                }
            }
        };

        this.accountHeaderUser = null;
        this.allNavItems = null;
        this.header = null;
    }

    async componentDidMount() {
        (new SessionStore()).setUserType(this.props.config.siteConfig);
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

        this.punchoutSetup();

         // Validates 1TU token, once get from query string
        await this.punchoutLogin();

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

        // Check if Personal Details have been updated
        const store = new SessionStore();
        const hasBeenUpdated = store.getPersonalDetailsUpdated() === 'Y' ? true : false;
        if (hasBeenUpdated) {
            const savedUserDetails = store.getUserDetails();
            const savedSoldToDetails = store.getSoldToDetails();

            let updatedUserName = '';
            if(Object.keys(savedUserDetails).length !== 0) {
                const mailingAddress = savedUserDetails.userAddress.filter(address => address.addressType === 'mailingAddress');
                const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';

                if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
                    updatedUserName = savedUserDetails.firstName && savedUserDetails.lastName ? `${savedUserDetails.lastName} ${savedUserDetails.firstName}` : '';
                } else {
                    updatedUserName = savedUserDetails.firstName && savedUserDetails.lastName ? `${savedUserDetails.firstName} ${savedUserDetails.lastName}` : '';
                }
            } else {
                this.retrieveUserDetails();
            }

            let updatedAccountName = "";

            // Check that Sold to Exists
            if (savedSoldToDetails && savedSoldToDetails.length !== 0) {
                let updatedAccount;
                savedSoldToDetails.map((soldTo) => {
                    if(soldTo.default_soldTo === 1) {
                        updatedAccount = soldTo;
                    }
                });
                updatedAccountName = updatedAccount.company ? updatedAccount.company : "";
            }

            let currentState = this.state;
            currentState.config.userDetails.userName = updatedUserName;
            currentState.config.userDetails.accountName = updatedAccountName;

            this.setState({
                ... currentState
            });
            store.removePersonalDetailsUpdated();
        }

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

    retrieveUserDetails = async () => {
        const userDetails = await UserDetailsLazy(this.props.config.userDetailsUrl);
        const soldToDetails = await SoldToDetailsLazy(this.props.config.soldToDetailsUrl);

        const mailingAddress = Object.keys(userDetails).length > 0 && userDetails.userAddress.filter(address => address.addressType === 'mailingAddress');
        const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
        let userName = '';
        if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
            userName = userDetails.firstName && userDetails.lastName ? `${userDetails.lastName} ${userDetails.firstName}` : '';
        } else {
            userName = userDetails.firstName && userDetails.lastName ? `${userDetails.firstName} ${userDetails.lastName}` : '';
        }
        // Fix to correct first soldTo being selected. It should be the default_soldTo === 1 selected
        let priorityAccount;
        let accountName = "";
        soldToDetails.map((soldTo) => {
            if(soldTo.default_soldTo === 1) {
                priorityAccount = soldTo;
            }
        });

        if (priorityAccount){
            accountName = priorityAccount.company ? `${priorityAccount.company} ` : '';
        }

        this.setState({
            ... this.state,
            config: {
                ... this.props.config,
                loginState: loginStatus.state(),
                userDetails: {
                    userName,
                    accountName
                }
            }
        });
    }

    getConfig = () => {
        if (this.state.config.userDetails.userName || !loginStatus.state()) {
            return this.state.config;
        }

        const store = new SessionStore();
        const userDetails = store.getUserDetails();
        const soldToDetails = store.getSoldToDetails();

        let userName = '';
        if(Object.keys(userDetails).length !== 0) {
            const mailingAddress = userDetails.userAddress.filter(address => address.addressType === 'mailingAddress');
            const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';

            if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
                userName = userDetails.firstName && userDetails.lastName ? `${userDetails.lastName} ${userDetails.firstName}` : '';
            } else {
                userName = userDetails.firstName && userDetails.lastName ? `${userDetails.firstName} ${userDetails.lastName}` : '';
            }
        }

        const priorityAccount = soldToDetails && soldToDetails.length !== 0 ? soldToDetails[0] : {};
        const accountName = priorityAccount.company ? `${priorityAccount.company} ` : '';

        return {
            ... this.props.config, 
            loginState: loginStatus.state(),
            userDetails: {
                userName,
                accountName
            }
        }
    }

    punchoutLogin = async () => {
        const urlParams = parseQueryParams(window.location.search);
        const token = urlParams['1tu'] || '';
        if (token) {
            const { response } = await punchoutLogin(this.props.config.punchoutLogin, { token });
            if ( response && response.status !== 200) {
                //  TODO, Error handling
            } else {
                removeQString();
            }
        }
    }

    punchoutSetup = async () => {
        const urlParams = parseQueryParams(window.location.search);
        const sid = urlParams['sid'] || '';
        if (sid) {
            const response = await punchoutSetup(buildUrl({
                pathname: this.props.config.punchoutSetup,
                query: {},
                pathVars: {
                    userId: "anonymous",
                    sid: sid
                }
            }));
            if (response && response.status !== 200) {
                //  TODO, Error handling
            } else {
                (new SessionStore()).setPunchoutSetupDetails({
                    returnUrl: response.return_url,
                    redirectUrl: response.redirect_url,
                    buyerOrgName: response.buyerOrgName,
                    currency: response.currency,
                    country: response.country,
                });
                (new LocalStore()).setCartId(response.cartId);
            }
        }
    }

    render() {
        return (
            <>
                {this.state.isMobile ? (
                    <Modal isOpen={this.state.isShown} className={keys.ModalWithSiteNavOnMobile} onClose={this.toggleModal}>
                        <Header title={this.state.config.title} />
                        <MyAccountContainer config={this.getConfig()} />
                    </Modal>
                ) : (
                    <MyAccountContainer config={this.getConfig()} />
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