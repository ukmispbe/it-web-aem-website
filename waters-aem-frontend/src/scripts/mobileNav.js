import ScreenSizes from '../scripts/screenSizes';
import NavMenu from '../scripts/navigation-level2';

const MobileNav = function () {

    const header = document.querySelector('header.cmp-header');
    const headerTB = document.querySelector('header.cmp-header .cmp-header__top-bar');
    const headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
    const headerNavigation = document.querySelector('.cmp-header__navigation');
    let headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation');

    const showMobileNav = () => { 
        headerTB_mobile_btn.classList.add('is-active');
        headerNavigation.classList.add('is-active');
        header.classList.add('is-fixed');
        document.documentElement.classList.add('no-scroll');
    }

    const hideMobileNav = () => {
        headerTB_mobile_btn.classList.remove('is-active');
        headerNavigation.classList.remove('is-active');
        header.classList.remove('is-fixed');
        document.documentElement.classList.remove('no-scroll');

        const navMenuFunc = NavMenu();
        if (navMenuFunc) { 
            navMenuFunc();
        }
    }

    const resizeMobileNav = () => { 
        if (!ScreenSizes.isMobile() && headerTB_mobile_btn.classList.contains( 'is-active') ||
            !ScreenSizes.isMobile() && headerNavigation.classList.contains( 'is-active') ||
            !ScreenSizes.isMobile() && header.classList.contains( 'is-fixed') ||
            !ScreenSizes.isMobile() && document.documentElement.classList.contains( 'no-scroll')
        ){
            hideMobileNav();
        } 

        if (headerNavigation_mainUL) { 
            if (headerNavigation_mainUL.childNodes.length > 0) {
                if (ScreenSizes.isMobile()) {
                    headerNavigation_mainUL.children[0].style.height = (window.innerHeight - headerTB.offsetHeight) + 'px';
                } else {
                    headerNavigation_mainUL.children[0].style.height = 'auto';
                }
            }
        }
    } 

    const toggleMobileNav = () => { 
        if (headerTB_mobile_btn.classList.contains('is-active')) {
            hideMobileNav();
        } else {
            showMobileNav();
        }
    } 

    return {
        show: () => showMobileNav(),
        hide: () => hideMobileNav(),
        resize: () => resizeMobileNav(),
        toggle: () => toggleMobileNav()
    }
}

export default MobileNav;