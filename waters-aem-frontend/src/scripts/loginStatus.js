import domElements from '../scripts/domElements';

const loggedInCookie = 'WatersLoginCookie';
const greetingCookie = 'WatersGreetingCookie';
const greetingPreFix = 'Hello, ';

const loginStatus = {
    
    state: () => {
        return domElements.getCookie(loggedInCookie) ? true : false;
    },
    getGreeting: () => { 
        let greeting = domElements.getCookie(greetingCookie);
        let loggedIn = domElements.getCookie(loggedInCookie) ? true : false;
        if (greeting && loggedIn) { 
            return greetingPreFix + decodeURIComponent(greeting).trim();
        }
    }
}

export default loginStatus;