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

export async function signOutRequest(url, signOutUrl, homepageLink) {
    const sessionStore = new SessionStore();
    sessionStore.removeUserDetails();
    sessionStore.removeSoldToDetails();

    const response = await getData(url);
    //TODO: Remove after MyAccount-R-6.1.0 release

    if(!signOutUrl.includes('/nextgen')) {
        homepageLink = signOutUrl;
    }
    window.location.href = homepageLink;
}