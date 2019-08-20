import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import MobileNav from '../scripts/mobileNav';


let header, headerTB_user, headerOverlay, headerTB_user_link, headerTB_user_link_greetingText, headerTB_user_link_greetingText_mobile, headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation;
let activeDD = false;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() {
    header = document.querySelector('header.cmp-header');
    headerOverlay = document.querySelector('.cmp-header__overlay.overlay');

    headerTB_user = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');

    headerTB_user_link_greetingText = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text');
    headerTB_user_link_greetingText_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__dropdown .greeting-text.mobile');
    
    headerTB_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile');
    headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
    
    headerNavigation = document.querySelector('.cmp-header__navigation');  
    headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation'); 

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
        let greeting = loginStatus.getGreeting();
        if (greeting) {
            headerTB_user_link_greetingText.innerHTML = greeting;
        }
    } else {
        domElements.removeClass(headerTB_user, loggedInClass)
    }

    const isUsed = 'is-used';
    if (headerNavigation_comp) { 
        domElements.addClass(headerTB_mobile, isUsed);
    }
}

window.addEventListener('load', headerInit);