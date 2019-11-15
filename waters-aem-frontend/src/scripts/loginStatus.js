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
        let greetingElem = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
            
        if (greeting && loggedIn && greetingElem) {
            let greetingPreFix = greetingElem.dataset.greeting || '';
            greeting = greeting.replace(/["]+/g, '');
            return greetingPreFix + decodeURIComponent(greeting).trim();
        }
    }
}

export default loginStatus;