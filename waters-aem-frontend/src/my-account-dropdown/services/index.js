import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';

const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export async function signOutRequest(url, homepageLink) {
    const sessionStore = new SessionStore();
    sessionStore.removeUserDetails();
    sessionStore.removeSoldToDetails();

    const response = await getData(url);

    window.location.href = homepageLink;
}