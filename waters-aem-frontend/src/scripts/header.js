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
}

function render() { 
    if (loginStatus.state()) {
        domElements.addClass(loginNavItem, 'loggedIn');
        let greeting = loginStatus.getGreeting();
        if (greeting) {
            greetingText.innerHTML = greeting;
        }
    } else {
        domElements.removeClass(loginNavItem, 'loggedIn')
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
    
    if (loggedIn) {
        if (e.type == 'mouseover') {
            domElements.addClass(headerOverlay, 'active');
        } else {
            domElements.removeClass(headerOverlay, 'active');
        }
    }
}

function toggleMobileMenu(e) {
    if (domElements.hasClass(e.currentTarget, 'is-active')) {
        domElements.removeClass(e.currentTarget, 'is-active');
        domElements.removeClass(headerNavigation, 'is-active');
        domElements.removeClass(header, 'is-fixed');
    } else {
        domElements.addClass(e.currentTarget, 'is-active');
        domElements.addClass(headerNavigation, 'is-active');
        domElements.addClass(header, 'is-fixed');
    }
}


window.addEventListener('load', headerInit);