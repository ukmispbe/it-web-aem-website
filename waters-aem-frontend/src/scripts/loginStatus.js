import cookieStore from '../stores/cookieStore';

const loginStatus = {
    
    state: () => {
        return cookieStore.getLoggedInStatus() ? true : false;
    },
    getGreeting: () => { 
        let greeting = cookieStore.getGreeting();
        let loggedIn = cookieStore.getLoggedInStatus() ? true : false;
        let greetingElem = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');

        if (greeting && loggedIn && greetingElem) {
            let greetingPreFix = greetingElem.dataset.greeting || '';
            greeting = greeting.replace(/["]+/g, '');
            return greetingPreFix + decodeURIComponent(greeting).trim();
        }
    }
}

export default loginStatus;