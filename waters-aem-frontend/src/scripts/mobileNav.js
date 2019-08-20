import screenSizes from '../scripts/screenSizes';
import NavMenu from '../scripts/navigation-level2';

const MobileNav = function () {

    const headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
    const headerNavigation = document.querySelector('.cmp-header__navigation');
    const header = document.querySelector('header.cmp-header');

    const showMobileNav = () => { 
        headerTB_mobile_btn.classList.add('is-active');
        headerNavigation.classList.add('is-active');
        header.classList.add('is-fixed');
        document.documentElement.classList.add('noscroll');
    }

    const hideMobileNav = () => {
        headerTB_mobile_btn.classList.remove('is-active');
        headerNavigation.classList.remove('is-active');
        header.classList.remove('is-fixed');
        document.documentElement.classList.remove('noscroll');

        const navMenuFunc = NavMenu();
        if (navMenuFunc) { 
            navMenuFunc();
        }
    }

    const resizeMobileNav = () => { 
        if (!screenSizes.isMobile() && headerTB_mobile_btn.classList.contains( 'is-active') ||
            !screenSizes.isMobile() && headerNavigation.classList.contains( 'is-active') ||
            !screenSizes.isMobile() && header.classList.contains( 'is-fixed') ||
            !screenSizes.isMobile() && document.documentElement.classList.contains( 'noscroll')
        ){
            hideMobileNav();
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