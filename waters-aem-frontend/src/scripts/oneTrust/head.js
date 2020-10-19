const getHeadScript = `
    var optanonCookieName = 'OptanonConsent';
    var optanonAlertBoxClosedCookieName = 'OptanonAlertBoxClosed';
    //Get Cookie Details from parent       
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
        console.log('message received')
        if (event && event.data.OptanonConsent !== undefined) {
            setCookie("OptanonConsent", event.data.OptanonConsent);
            if (event.data.OptanonAlertBoxClosed) {
                setCookie("OptanonAlertBoxClosed", event.data.OptanonAlertBoxClosed)
            }
        }
    }

    function setCookie(name, value) {
        var date = new Date();
        date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + '; path=/; expires=' + date.toUTCString() + ';';
    }

    //Send cookie details to parent
    window.onload = function () {
        if (getCookie(optanonCookieName)) {
            var cookie1 = getCookie(optanonCookieName);
            var cookie2 = getCookie(optanonAlertBoxClosedCookieName)
            if (cookie2) {
                parent.postMessage({
                    name: "OneTrustCookies",
                    OptanonConsent: cookie1,
                    OptanonAlertBoxClosed: cookie2
                }, "*");
            } else {
                parent.postMessage({
                    name: "OneTrustCookies",
                    OptanonConsent: cookie1
                }, "*");
            }
        } else {
            parent.postMessage({
                name: "OneTrustCookies",
            }, "*");
        }

    }

    function getCookie(name) {
        var nameEq = name + '=',
            ca = document.cookie.split(';'),
            i,
            c;

        for (i = 0; i < ca.length; i += 1) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);

            }
            if (c.indexOf(nameEq) == 0) {
                return c.substring(nameEq.length, c.length);

            }
        }
        return "";
    }
`;

export default getHeadScript;