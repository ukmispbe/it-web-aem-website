import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import QuickOrder from '../quick-order/QuickOrder';
import ScreenSizes from '../scripts/screenSizes';
import MobileNav from '../scripts/mobileNav';
import domElements from '../scripts/domElements';
import { addQuickOrderLink, removeQuickOrderLink } from '../scripts/quickorderlink';
import { buildViewCartURL } from '../utils/eCommerceFunctions';

class HeaderQuickOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false,
            isMobile: ScreenSizes.isMobile(),
        };

        this.headerNav = null;
        this.allNavItems = null;
        this.header = null;
    }

    async componentDidMount() {
        this.headerNav = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__quick-order');
        this.header = document.querySelector('header.cmp-header');
        const multipleItemLink = document.querySelector('.quick-order-multiple-item');

        if (this.headerNav) {
            this.headerNav.addEventListener('mouseover', this.handleOutsideEvent);
            this.headerNav.addEventListener('mouseleave', this.handleOutsideEvent);
            this.headerNav.addEventListener('click', this.handleOutsideEvent);
            this.hideOnMobile(ScreenSizes.isMobile());
        }
        window.addEventListener('resize', this.updateViewport, true);
        if (multipleItemLink) {
            multipleItemLink.addEventListener('click', function (event) {
                if (event) {
                    event.stopPropagation();
                }
            });
        }
    }

    componentWillUnMount() {
        if (this.headerNav) {
            this.headerNav.removeEventListener('mouseover', this.handleOutsideEvent);
            this.headerNav.removeEventListener('mouseleave', this.handleOutsideEvent);
            this.headerNav.removeEventListener('click', this.handleOutsideEvent);
        }
        window.removeEventListener('resize', this.updateViewport, true);
    }

    hideOnMobile = isMobile => {
        const hideQuickOrderOnHeader = "top-bar__nav__quick-order--hide";
        if (this.headerNav && this.headerNav.classList) {
            if (isMobile) {
                this.headerNav.classList.add(hideQuickOrderOnHeader);
                addQuickOrderLink();
            } else {
                this.headerNav.classList.remove(hideQuickOrderOnHeader);
                removeQuickOrderLink();
            }
        }
    }

    updateViewport = () => {
        if (!ScreenSizes.isMobile()) {
            if (this.state.isShown == true) {
                this.willShow(false);
            }
        }

        this.setState({
            isMobile: ScreenSizes.isMobile()
        }, () => this.hideOnMobile(this.state.isMobile));
    }

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

                this.headerNav.classList.add(activeDDClass);
                if (!this.state.isMobile) {
                    headerOverlay.classList.add(activeOverlay);
                } else {
                    domElements.noScroll(true);
                    if (this.header && header && header.classList) {
                        header.classList.add('is-fixed');
                    }
                }
            } else {
                this.headerNav.classList.remove(activeDDClass);
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
                case e.type == 'click' && !this.state.isMobile:
                    e.preventDefault();
                    break;
                case e.type == 'mouseleave' && !this.state.isMobile:
                    this.willShow(false);
                    break;
            }
        }
    }

    render() {
        if (this.state.isMobile) return null;
        return (
            <QuickOrder {...this.props} multipleItemsLink={buildViewCartURL(this.props.multipleItemsLink)} isInHeader={true} />
        )
    }
}

HeaderQuickOrder.propTypes = {
    buttonLabel: PropTypes.string,
    addToCartPlaceHolder: PropTypes.string,
    addToCartUrl: PropTypes.string,
    multipleItemsLabel: PropTypes.string,
    multipleItemsLink: PropTypes.string,
    multipleItemsIcon: PropTypes.string,
    skuConfig: PropTypes.object,
    errorMsg: PropTypes.string
}

HeaderQuickOrder.defaultProps = {
    buttonLabel: '',
    addToCartPlaceHolder: '',
    addToCartUrl: '',
    multipleItemsLabel: '',
    multipleItemsLink: '',
    multipleItemsIcon: '',
    skuConfig: {},
    errorMsg: ''
}

export default HeaderQuickOrder;