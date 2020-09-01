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
import punchoutLogin from '../my-account/services/PunchoutLogin';
import punchoutSetup from '../my-account/services/PunchoutSetup';
import parseQueryParams from '../utils/parse-query-params';
import removeQueryString from '../utils/remove-query-string';
import { isEprocurementUser } from '../utils/userFunctions';
import buildUrl from '../utils/buildUrl';
import EprocSetupFailure from '../eproc-setup-failure/EprocSetupFailure';

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
            },
            eprocSetupFailure: {
                status: false,
                title: '',
                text: '',
                icon: this.props.eProcSetupFailure.icon,
                buttons: this.props.eProcSetupFailure.buttons
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

        if (isEprocurementUser()) {
            this.punchoutSetup();

            // Validates 1TU token, once get from query string
            await this.punchoutLogin();
        }

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

    formatUserName = (userDetails) => {
        let userName = '';
        if (userDetails.mailingAddressCountryCode === 'jp' || userDetails.mailingAddressCountryCode === 'cn' 
            || userDetails.mailingAddressCountryCode === 'kr' || userDetails.mailingAddressCountryCode === 'tw') {
            userName = userDetails.firstName && userDetails.lastName ? `${userDetails.lastName} ${userDetails.firstName}` : '';
        } else {
            userName = userDetails.firstName && userDetails.lastName ? `${userDetails.firstName} ${userDetails.lastName}` : '';
        }
        return userName;
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

                updatedUserName = this.formatUserName(savedUserDetails);

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
        const checkSessionStore = true;
        const userDetails = await UserDetailsLazy(this.props.config.userDetailsUrl, checkSessionStore);
        const soldToDetails = await SoldToDetailsLazy(this.props.config.soldToDetailsUrl);

        const userName = this.formatUserName(userDetails);

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

        const userName = this.formatUserName(userDetails);

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

    setEprocFailure = (config) => {
        this.setState(prevState => ({
            eprocSetupFailure: {
                ...prevState.eprocSetupFailure,
                status: !this.props.isEditMode,
                ...config,
            }
        }));
    }

    punchoutLogin = async () => {
        const urlParams = parseQueryParams(window.location.search);
        const token = urlParams['1tu'] || '';
        const sessionStore = new SessionStore();
        const { requestFailureTitle, requestFailureMessage, sessionTimeoutTitle, sessionTimeoutMessage } = this.props.eProcSetupFailure;
        const checkAndSetError = async (responseJson = {}) => {
            try {
                let punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                if (!this.state.eprocSetupFailure.status) {
                    if (Object.keys(punchoutSetupDetails).length === 0) {
                        await this.punchoutSetup(); // retrieve punchout setup
                        punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                    }
                    this.setEprocFailure({
                        title: responseJson.code === 804 ? sessionTimeoutTitle : requestFailureTitle,
                        text: responseJson.code === 804 ? sessionTimeoutMessage : requestFailureMessage,
                        buttons: [{
                            text: this.state.eprocSetupFailure.buttons[0].text,
                            action: Object.keys(punchoutSetupDetails).length > 0 && punchoutSetupDetails.redirectUrl ? punchoutSetupDetails.redirectUrl : '',
                        }]
                    });
                }
            } catch (error) {
                this.setEprocFailure({
                    title: requestFailureTitle,
                    text: requestFailureMessage
                });
            }
        }
        try {
            if (token) {
                sessionStore.removeUserDetails();
                const { response } = await punchoutLogin(this.props.config.punchoutLogin, { token });
                if (response && response.status !== 200) {
                    const responseJson = await response.json();
                    await checkAndSetError(responseJson);
                } else {
                    const userDetailsUrl = (this.props.config && this.props.config.userDetailsUrl) || '';
                    const soldToDetailsUrl = (this.props.config && this.props.config.soldToDetailsUrl) || '';
                    sessionStore.removeSoldToDetails();
                    if (userDetailsUrl && soldToDetailsUrl) {
                        await UserDetailsLazy(userDetailsUrl, false);
                        await SoldToDetailsLazy(soldToDetailsUrl);
                    }
                }
            } else if (!loginStatus.state()) {
                sessionStore.removeUserDetails();
                sessionStore.removeSoldToDetails();
                await checkAndSetError();
            }
        } catch (e) {
            checkAndSetError();
        }
        removeQueryString(window.location.href, '1tu', true);
    }

    punchoutSetup = async () => {
        const sessionStore = new SessionStore();
        const urlParams = parseQueryParams(window.location.search);
        const sid = urlParams['sid'] || '';
        const { requestFailureTitle, requestFailureMessage } = this.props.eProcSetupFailure;
        const setPunchoutError = () => {
            this.setEprocFailure({
                title: requestFailureTitle,
                text: requestFailureMessage
            });
        }
        try {
            if (sid) {
                sessionStore.removePunchoutSetupDetails();
                (new LocalStore()).removeCartId();
                const response = await punchoutSetup(buildUrl({
                    pathname: this.props.config.punchoutSetup,
                    query: {},
                    pathVars: {
                        userId: "anonymous",
                        sid: sid
                    }
                }));
                if (response && response.status !== 200) {
                    const punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                    const buttonConfig = this.state.eprocSetupFailure.buttons && this.state.eprocSetupFailure.buttons[0] ? {
                        text: this.state.eprocSetupFailure.buttons[0].text,
                        action: Object.keys(punchoutSetupDetails).length > 0 && punchoutSetupDetails.redirectUrl ? punchoutSetupDetails.redirectUrl : '',
                    } : {};
                    this.setEprocFailure({
                        title: requestFailureTitle,
                        text: requestFailureMessage,
                        buttons: [buttonConfig]
                    });
                } else {
                    sessionStore.setPunchoutSetupDetails({
                        returnUrl: response.return_url,
                        redirectUrl: response.redirect_url,
                        buyerOrgName: response.buyerOrgName,
                        currency: response.currency,
                        country: response.country,
                    });
                    (new LocalStore()).setCartId(response.cartId);
                }
            } else if (Object.keys(sessionStore.getPunchoutSetupDetails()).length === 0) {
                setPunchoutError();
            }
        } catch (error) {
            setPunchoutError();
        }
        removeQueryString(window.location.href, 'sid', true);
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
                <EprocSetupFailure {...this.state.eprocSetupFailure} />
            </>
        )
    }
}

MyAccountDropDown.propTypes = {
    config: PropTypes.object.isRequired,
    eProcSetupFailure: PropTypes.object,
    isEditMode: PropTypes.bool
};

MyAccountDropDown.defaultProps = {
    eProcSetupFailure: {
        requestFailureTitle: '',
        requestFailureMessage: '',
        sessionTimeoutTitle: '',
        sessionTimeoutMessage: '',
        icon: '',
        buttons: [{ text: '' }]
    },
    isEditMode: false
}

export default MyAccountDropDown;
export { myAccountModalTheme };