const getBody = `
function OptanonWrapper() {
    function E(b) {
        b += "\x3d";
        var e = document.cookie.split(";"),
            g, h;
        for (g = 0; g < e.length; g += 1) {
            for (h = e[g];
                " " == h.charAt(0);)
                h = h.substring(1, h.length);
            if (0 == h.indexOf(b))
                return h.substring(b.length, h.length)
        }
        return null
    }

    var value = E('OptanonConsent');
    var value1 = E('OptanonAlertBoxClosed');

    for (i = 0; i < window.frames.length; i++) { //for each frame/iframe on the page
        var pass_data = {
            'OptanonConsent': value,
            'OptanonAlertBoxClosed': value1
        };
        window.frames[i].postMessage(pass_data, '*');
    }
}

// 2nd script
(function () {
    var iframe = document.createElement('iframe');

    // Change .src to their iframe
    iframe.src = "[[full iframe URL]]";
    iframe.name = "OTcrossDomain";
    document.body.appendChild(iframe);
    window.addEventListener('message', function (event) { //Add event listener
        if (event.data.name === "OneTrustCookies") {
            var date = new Date();
            date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
            if (event.data.OptanonConsent) {
                document.cookie = "OptanonConsent=" + event.data.OptanonConsent + ";path=/; expires=" + date.toUTCString() + ";";
                document.cookie = "OptanonAlertBoxClosed=" + event.data.OptanonAlertBoxClosed + ";path=/; expires=" + date.toUTCString() + ";";
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.setAttribute('src', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
            script.setAttribute('charset', 'UTF-8');

            // Change to their data-domain-script
            script.setAttribute('data-domain-script', '[[Add Domain ID]]');
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    })
})()`;

export default getBody;
