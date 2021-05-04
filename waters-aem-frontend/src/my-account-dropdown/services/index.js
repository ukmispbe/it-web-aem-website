import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import {setUserDataForDataDog} from '../../utils/userFunctions'

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
    const localStore = new LocalStore();
    localStore.removeGUID();
    localStore.removeCartId();

    const response = await getData(url);
    //TODO: Remove after MyAccount-R-6.1.0 release

    if(signOutUrl.indexOf('/nextgen') === -1) {
        homepageLink = signOutUrl;
    }
    setUserDataForDataDog();
    window.location.href = homepageLink;
}