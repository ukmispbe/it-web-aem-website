import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import screenSizes from '../scripts/screenSizes';

let loginNavItem, loginList, greetingText;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() { 
    loginNavItem = document.querySelector('.cmp-external-header__user');
    loginList = document.querySelector('.cmp-external-header__user__link');
    greetingText = document.querySelector('.cmp-external-header__user__link__greeting-text');
}

function addEventListeners() { 
    loginList.addEventListener('click', loginListHandler);
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

window.addEventListener('load', headerInit);