import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import screenSizes from '../scripts/screenSizes';

let loginNavItem, headerOverlay, loginList, greetingText;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() { 
    loginNavItem = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
    headerOverlay = document.querySelector('.cmp-header__overlay.overlay');
    loginList = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link');
    greetingText = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text');    
}

function addEventListeners() { 
    loginList.addEventListener('click', loginListHandler);
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

function updateOverlay(e){ 
    if (e.type == 'mouseover') {
        domElements.addClass(headerOverlay, 'active');
    } else { 
        domElements.removeClass(headerOverlay, 'active');
    }
}

window.addEventListener('load', headerInit);