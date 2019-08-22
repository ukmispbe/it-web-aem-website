import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import MobileNav from '../scripts/mobileNav';
import ScreenSizes from '../scripts/screenSizes';


let headerTB, headerTB_user, headerTB_user_link_greetingText,  headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation_mainUL;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() {
    headerTB = document.querySelector('header.cmp-header .cmp-header__top-bar');
    headerTB_user = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
    headerTB_user_link_greetingText = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text');
    headerTB_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile');
    headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');

    headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
    headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation')
    if (headerNavigation_comp) { 
        headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation').children[0];
    }
    
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

        if (headerNavigation_mainUL) { 
            if (ScreenSizes.isMobile()) { 
                headerNavigation_mainUL.style.height = (window.innerHeight - headerTB.offsetHeight) + 'px';
            }
        }    
    }
}

window.addEventListener('load', headerInit);
