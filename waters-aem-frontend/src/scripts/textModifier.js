import SessionStore, { keys } from './../stores/sessionStore';
const session = new SessionStore();

import getUserDetails from './../my-account/services/UserDetailsLazy';

async function textModifier() {
    const detailsUrl = document.getElementById('header').dataset.userDetailsUrl;
    const checkSessionStore = false;
    const userDetails = await getUserDetails(detailsUrl, checkSessionStore, session);

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

textModifier();
