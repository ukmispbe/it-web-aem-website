import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import screenSizes from '../scripts/screenSizes';

let loginNavItem, loginList, greetingText, mobileMenuToggle;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() { 
    loginNavItem = document.querySelector('.cmp-header__user');
    loginList = document.querySelector('.cmp-header__user__link');
    greetingText = document.querySelector('.cmp-header__user__link__greeting-text');
    mobileMenuToggle = document.querySelector('.cmp-header__mobile button');
}

function addEventListeners() { 
    loginList.addEventListener('click', loginListHandler);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
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

function toggleMobileMenu(e) { 
    if (domElements.hasClass(e.currentTarget, 'is-active')) {
        domElements.removeClass(e.currentTarget, 'is-active');
    } else { 
    domElements.addClass(e.currentTarget, 'is-active');
    }
}

window.addEventListener('load', headerInit);