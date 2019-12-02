import cookieStore from '../stores/cookieStore';

const loginStatus = {
    
    state: () => {
        return cookieStore.getLoggedInStatus() ? true : false;
    }
}

export default loginStatus;