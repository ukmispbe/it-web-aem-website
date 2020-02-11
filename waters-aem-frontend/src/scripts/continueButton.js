import SessionStore from './../stores/sessionStore';
const session = new SessionStore();

const continueBtns = document.querySelectorAll('.cmp-button-continue');
const continuePage = session.getContinueLink();

if (continueBtns.length && continuePage) {
    Array.from(continueBtns).forEach(btn => {
        btn.href = continuePage;
    });

    // for (const btn of continueBtns) {
    //     btn.href = continuePage;
    // }

    session.removeContinueLink();
}

(function getAllSignInLinks() {
    const header = document.getElementById('header');
    const signin = header.dataset.signinUrl;
    const register = header.dataset.registerUrl;

    const allLinks = document.getElementsByTagName('a');

    Array.from(allLinks).forEach(link => {
        if (link.href === signin || link.href === register) {
            link.addEventListener('click', e => {
                session.setContinueLink(window.location.href);
            });
        }
    });

    // for (const link of allLinks) {
    //     if (link.href === signin || link.href === register) {
    //         link.addEventListener('click', e => {
    //             session.setContinueLink(window.location.href);
    //         });
    //     }
    // }
})();
