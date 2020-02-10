import SessionStore, { keys } from './../stores/sessionStore';
const session = new SessionStore();

import getUserDetails from './../my-account/services/UserDetailsLazy';
const detailsUrl = document.getElementById('header').dataset.userDetailsUrl;
const userDetails = getUserDetails(detailsUrl, session);

const objMapping = {
    user: keys.userDetails,
    userDetails: keys.userDetails
};

if (userDetails) {
    const textReplaceElements = document.querySelectorAll('.text-replace');
    const replaceObj = {
        [keys.userDetails]: userDetails
    };

    for (const el of textReplaceElements) {
        const matches = el.innerHTML.match(/{{(.*?)}}/gi);

        for (const match of matches) {
            const splitMatch = match.split('.');
            const key = splitMatch[0].replace('{{', '');
            const field = splitMatch[1].replace('}}', '');
            const replacement = replaceObj[objMapping[key]][field];

            el.innerHTML = el.innerHTML.replace(match, replacement);
        }
    }
}
