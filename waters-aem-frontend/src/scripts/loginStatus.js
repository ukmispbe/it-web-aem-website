import domElements from '../scripts/domElements';

const loggedInCookie = 'WatersLoginCookie';
const greetingCookie = 'WatersGreetingCookie';

const loginStatus = {
    
    state: () => {
        return domElements.getCookie(loggedInCookie) ? true : false;
    },
    getGreeting: () => { 
        let greeting = domElements.getCookie(greetingCookie);
        let loggedIn = domElements.getCookie(loggedInCookie) ? true : false;
        let greetingPreFix = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user__link .greeting-text').dataset.greeting || '';  
            
        if (greeting && loggedIn) {
            greeting = greeting.replace(/["]+/g, '');
            return greetingPreFix + decodeURIComponent(greeting).trim();
        }
    }
}

export default loginStatus;