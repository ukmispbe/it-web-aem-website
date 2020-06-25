import SessionStore, { keys } from './../stores/sessionStore';
const session = new SessionStore();

import getUserDetails from './../my-account/services/UserDetailsLazy';
import SoldToDetailsLazy from '../my-account/services/SoldToDetailsLazy';
import userAuth from '../my-account/services/UserAuth';
import parseQueryParams from '../utils/parse-query-params';

async function fetchUserDetails() {
    const urlParams = parseQueryParams(window.location.search);
    const token = urlParams['1tu'] || '';
    if (token) {
        const { response } = await userAuth('/data.json', token);
        if (
            response &&
            (response.status === 400 ||response.status === 403 || response.status === 500 || response.status === 'BAD_REQUEST')
        ) {
            //  TODO, Error handling
            return;
        }
    }
    const { userDetailsUrl, soldToDetailsUrl } = document.getElementById('header').dataset;
    const userDetails = await getUserDetails(userDetailsUrl, session);
    await SoldToDetailsLazy(soldToDetailsUrl); // stors soldToDetails in session storage

    const objMapping = {
        user: keys.userDetails,
        userDetails: keys.userDetails
    };

    if (userDetails) {
        const textReplaceElements = document.querySelectorAll('.text-replace');
        const replaceObj = {
            [keys.userDetails]: userDetails
        };

        Array.from(textReplaceElements).forEach(el => {
            const matches = el.innerHTML.match(/{{(.*?)}}/gi);

            Array.from(matches).forEach(match => {
                const splitMatch = match.split('.');
                const key = splitMatch[0].replace('{{', '');
                const field = splitMatch[1].replace('}}', '');
                const replacement = replaceObj[objMapping[key]][field];

                el.innerHTML = el.innerHTML.replace(match, replacement);
            });
        });
    }
}

fetchUserDetails();
