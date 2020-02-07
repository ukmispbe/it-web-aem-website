import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';

export async function signOutRequest(url) {
    const sessionStore = new SessionStore();
    sessionStore.removeUserDetails();

    const response = await fetch(url);
}