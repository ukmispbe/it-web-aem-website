import domElements from '../scripts/domElements';
import loginStatus from '../scripts/loginStatus';
import screenSizes from '../scripts/screenSizes';

let header, headerTB_user, headerOverlay, headerTB_user_link, headerTB_user_link_greetingText, headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation;

const headerInit = function() {
    domReferences();
    addEventListeners();
    render();
}

function domReferences() {
    header = document.querySelector('header.cmp-header');
    headerOverlay = document.querySelector('.cmp-header__overlay.overlay');

    headerTB_user = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
    headerTB_user_link = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link');
    headerTB_user_link_greetingText = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text');
    
    headerTB_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile');
    headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
    
    headerNavigation = document.querySelector('.cmp-header__navigation');  
    headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation'); 

}

function addEventListeners() { 
    headerTB_user_link.addEventListener('click', headerTB_user_linkHandler);
    headerTB_user.addEventListener('mouseover', updateOverlay);
    headerTB_user.addEventListener('mouseleave', updateOverlay);

    if (headerNavigation_comp) { 
        headerTB_mobile_btn.addEventListener('click', toggleMobileMenu);
        window.addEventListener('resize', resize);
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

function headerTB_user_linkHandler(e) { 
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
    if (domElements.hasClass(headerTB_mobile_btn, 'is-active')) {
        hideMobileNav();
    } else {
        showMobileNav();
    }
}

function hideMobileNav() { 
    domElements.removeClass(headerTB_mobile_btn, 'is-active');
    domElements.removeClass(headerNavigation, 'is-active');
    domElements.removeClass(header, 'is-fixed');
    domElements.removeClass(document.documentElement, 'noscroll');
}

function showMobileNav() { 
    domElements.addClass(headerTB_mobile_btn, 'is-active');
    domElements.addClass(headerNavigation, 'is-active');
    domElements.addClass(header, 'is-fixed');
    domElements.addClass(document.documentElement, 'noscroll');
    

}

function resize() { 
    if (!screenSizes.isMobile() && domElements.hasClass(headerTB_mobile_btn, 'is-active') ||
        !screenSizes.isMobile() && domElements.hasClass(headerNavigation, 'is-active') ||
        !screenSizes.isMobile() && domElements.hasClass(header, 'is-fixed') ||
        !screenSizes.isMobile() && domElements.hasClass(document.documentElement, 'noscroll')
    ) {
        hideMobileNav();
    } 
} 


window.addEventListener('load', headerInit);