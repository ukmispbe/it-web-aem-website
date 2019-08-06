import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import screenSizes from '../scripts/screenSizes';

let header, loginNavItem, headerOverlay, loginList, greetingText, mobileMenuToggle, headerNavigation;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() {
    header = document.querySelector('header.cmp-header');
    loginNavItem = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
    headerOverlay = document.querySelector('.cmp-header__overlay.overlay');
    loginList = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link');
    greetingText = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text');
    mobileMenuToggle = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
    headerNavigation = document.querySelector('.cmp-header__navigation');    
}

function addEventListeners() { 
    loginList.addEventListener('click', loginListHandler);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    loginNavItem.addEventListener('mouseover', updateOverlay);
    loginNavItem.addEventListener('mouseleave', updateOverlay);
    window.addEventListener('resize', resize);
}

function render() { 
    const loggedInClass = 'loggedIn';
    if (loginStatus.state()) {
        domElements.addClass(loginNavItem, loggedInClass);
        let greeting = loginStatus.getGreeting();
        if (greeting) {
            greetingText.innerHTML = greeting;
        }
    } else {
        domElements.removeClass(loginNavItem, loggedInClass)
    }
}

function loginListHandler(e) { 
    e.preventDefault();
    let loggedIn = loginStatus.state();

    if (!loggedIn) { 
        if (e.currentTarget.dataset.loginUrl) { 
            window.open(e.currentTarget.dataset.loginUrl, e.currentTarget.target);
        }
    }
}

function updateOverlay(e) { 
    let loggedIn = loginStatus.state();
    const activeOverlay = 'active';
    
    if (loggedIn) {
        if (e.type == 'mouseover') {
            domElements.addClass(headerOverlay, activeOverlay);
        } else {
            domElements.removeClass(headerOverlay, activeOverlay);
        }
    }
}

function toggleMobileMenu(e) {
    if (domElements.hasClass(mobileMenuToggle, 'is-active')) {
        hideMobileNav();
    } else {
        showMobileNav();
    }
}

function hideMobileNav() { 
    domElements.removeClass(mobileMenuToggle, 'is-active');
    domElements.removeClass(headerNavigation, 'is-active');
    domElements.removeClass(header, 'is-fixed');
}

function showMobileNav() { 
    domElements.addClass(mobileMenuToggle, 'is-active');
    domElements.addClass(headerNavigation, 'is-active');
    domElements.addClass(header, 'is-fixed');
}

function resize() { 
    console.log('resize');
    if (!screenSizes.isMobile() && domElements.hasClass(mobileMenuToggle, 'is-active') ||
        !screenSizes.isMobile() && domElements.hasClass(headerNavigation, 'is-active') ||
        !screenSizes.isMobile() && domElements.hasClass(header, 'is-active') 
    ) { 
        hideMobileNav();
    }
} 


window.addEventListener('load', headerInit);