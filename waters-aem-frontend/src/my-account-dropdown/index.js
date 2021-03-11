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
import { isEprocurementUser, setHeaderWelcome } from '../utils/userFunctions';
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
            },
            punchoutSetupCallCompleted: false,
            eProcLoginCallCompleted: false,
        };

        this.accountHeaderUser = null;
        this.allNavItems = null;
        this.header = null;
    }

    showHideLoader() {
        const {punchoutSetupCallCompleted, eProcLoginCallCompleted} = this.state;
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: !(punchoutSetupCallCompleted && eProcLoginCallCompleted) }}));
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
            // Show loader in case of eproc user
            this.showHideLoader();
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
                setHeaderWelcome(updatedUserName);
            } else {
                this.retrieveUserDetails();
            }

            let updatedAccountName = savedUserDetails.company;

            // Check that Sold to Exists
            if (savedSoldToDetails && savedSoldToDetails.length !== 0) {
                let updatedAccount;
                savedSoldToDetails.map((soldTo) => {
                    if(soldTo.soldToFlag === 1) {
                        updatedAccount = soldTo;
                    }
                });
                updatedAccountName = updatedAccount.name ? updatedAccount.name : "";
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
                    if (this.header && header && header.classList) {
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
                                if (this.header && header && header.classList) {
                                    header.classList.remove('is-fixed');
                                }
                            }
                        }
                    } else {
                        domElements.noScroll(false);
                        if (this.header && header && header.classList) {
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
        const userDetailsUrl = (this.props.config && this.props.config.userDetailsUrl) || '';
        const soldToDetailsUrl = (this.props.config && this.props.config.soldToDetailsUrl) || '';

        if (userDetailsUrl && soldToDetailsUrl) {
            const userDetails = await UserDetailsLazy(userDetailsUrl, checkSessionStore);
            if (Object.keys(userDetails).length && userDetails.userId && userDetails.salesOrg) {
                const soldToDetails = await SoldToDetailsLazy(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg);
                const userName = this.formatUserName(userDetails);
                setHeaderWelcome(userName);

                let priorityAccount = {};
                let accountName = "";

                if (Object.keys(soldToDetails).length) {
                    soldToDetails.map((soldTo) => {
                        if(soldTo.soldToFlag === 1) {
                            priorityAccount = soldTo;
                        }
                    });
                }

                if (Object.keys(priorityAccount).length){
                    accountName = priorityAccount.name ? `${priorityAccount.name} ` : '';
                } else {
                    accountName = userDetails.company
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
        }
    }

    getConfig = () => {
        if (this.state.config.userDetails.userName || !loginStatus.state()) {
            return this.state.config;
        }

        const store = new SessionStore();
        const userDetails = store.getUserDetails();
        const soldToDetails = store.getSoldToDetails();

        const userName = this.formatUserName(userDetails);
        setHeaderWelcome(userName);

        const priorityAccount = soldToDetails && soldToDetails.length !== 0 ? soldToDetails[0] : {};
        const accountName = priorityAccount.company ? `${priorityAccount.company} ` : userDetails.company;

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
        const localStore = new LocalStore();
        const { requestFailureTitle, requestFailureMessage, sessionTimeoutTitle, sessionTimeoutMessage } = this.props.eProcSetupFailure;
        const checkAndSetError = async (responseJson = {}) => {
            try {
                let punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                if (!this.state.eprocSetupFailure.status) {
                    if (Object.keys(punchoutSetupDetails).length === 0) {
                        await this.punchoutSetup(); // retrieve punchout setup
                        punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                    }
                    const buttonConfig = this.state.eprocSetupFailure.buttons && this.state.eprocSetupFailure.buttons[0] ? {
                        text: this.state.eprocSetupFailure.buttons[0].text,
                        action: Object.keys(punchoutSetupDetails).length > 0 && punchoutSetupDetails.redirectUrl ? punchoutSetupDetails.redirectUrl : '',
                    } : {};
                    this.setEprocFailure({
                        title: responseJson.code === 804 ? sessionTimeoutTitle : requestFailureTitle,
                        text: responseJson.code === 804 ? sessionTimeoutMessage : requestFailureMessage,
                        buttons: [buttonConfig]
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
                        const userDetails = await UserDetailsLazy(userDetailsUrl, false);
                        if (Object.keys(userDetails).length && userDetails.userId && userDetails.salesOrg) {
                            await SoldToDetailsLazy(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg);
                        } else {
                            await checkAndSetError();
                        }
                    }
                }
            } else if (!loginStatus.state()) {
                sessionStore.removeUserDetails();
                sessionStore.removeSoldToDetails();
                localStore.removeGUID();
                localStore.removeCartId();
                await checkAndSetError();
            }
        } catch (e) {
            checkAndSetError();
        }
        this.setState({ eProcLoginCallCompleted: true }, () =>
            this.showHideLoader()
        );
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
        this.setState({ punchoutSetupCallCompleted: true }, () =>
            this.showHideLoader()
        );
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