import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import cookieStore from '../../stores/cookieStore';

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

    const response = await getData(url);

    if (!response.status == 200) {
        cookieStore.setLogoutStatus();
    }
    window.location.href = homepageLink;
}