import cookieStore from '../stores/cookieStore';

const loginStatus = {
    
    state: () => {
        return cookieStore.getLoggedInStatus() ? true : false;
    },
    get name() { 
        let greeting = domElements.getCookie(greetingCookie);
        let loggedIn = domElements.getCookie(loggedInCookie) ? true : false;

        if (greeting && loggedIn) {
            greeting = greeting.replace(/["]+/g, '');
            return decodeURIComponent(greeting).trim();
        } else { 
            return '';
        }
    },
    
    get location() { 
        //TODO: grab location from user API once developed
        return 'SAMPLE LOCATION, XX 99999999999'
    }

}

export default loginStatus;