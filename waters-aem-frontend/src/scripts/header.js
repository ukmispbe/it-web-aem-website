import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import MobileNav from '../scripts/mobileNav';
import ScreenSizes from '../scripts/screenSizes';
import cookieStore from '../stores/cookieStore';
import ServletService from '../element-creators/services/servletService';
import SystemWideNotification from '../element-creators/systemWideNotification';
import SessionStore from '../stores/sessionStore';
import inlineSVG from '../scripts/inlineSVG';

const sessionStore = new SessionStore();

let headerTB, headerTB_user,  headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation_mainUL;

const headerInit = function() {
    domReferences();
    addEventListeners();
    //cookieStore.setLocale();
    render();
    renderSystemWideNotification();
}

function domReferences() {
    headerTB = document.querySelector('header.cmp-header .cmp-header__top-bar');
    headerTB_user = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
    headerTB_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile');
    headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');

    headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
    headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
}

function addEventListeners() { 
    if (headerNavigation_comp) { 
        const mobileNav = MobileNav();
        if (mobileNav) {
            headerTB_mobile_btn.addEventListener('click', mobileNav.toggle);
            window.addEventListener('resize', mobileNav.resize);
        }
    }
}

function render() { 
    const loggedInClass = 'loggedIn';
    if (loginStatus.state()) {
        domElements.addClass(headerTB_user, loggedInClass);
    } else {
        domElements.removeClass(headerTB_user, loggedInClass)
    }

    const isUsed = 'is-used';
    if (headerNavigation_comp) { 
        domElements.addClass(headerTB_mobile, isUsed);
    }

    if (headerNavigation_mainUL) { 
        if (headerNavigation_mainUL.childNodes.length > 0) {
            if (ScreenSizes.isMobile()) {
                headerNavigation_mainUL.children[0].style.height = (window.innerHeight - headerTB.offsetHeight) + 'px';
            }
        }
    }
}

const handleSystemWideNotificationDismiss = () => {
    const parent = document.querySelector('.cmp-header');
    const notification = parent.querySelector('.container-sitewide-notification');

    if(parent && notification) {
        parent.removeChild(notification);
        sessionStore.setDismissSystemWideNotification();
    }
}

const renderSystemWideNotification = async () => {
    if (sessionStore.getDismissSystemWideNotificatiopn() === 'Y') {
        // user has dismissed the notification during session so do not add to the DOM
        return;
    }

    const component = new SystemWideNotification(ServletService, handleSystemWideNotificationDismiss);
    const result = await component.create(Date.now());

    if(result.visible) {
        const parent = document.querySelector('.cmp-header');
        parent.appendChild(result.element);
        inlineSVG.init('img.inline-svg', 'svg-inlined');
    }
}

window.addEventListener('load', headerInit);