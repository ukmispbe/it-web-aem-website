import DigitalData from "../scripts/DigitalData";

const keys = {
    loggedInStatus: 'WatersGreetingCookie',
    soldToStatus: 'ST_STATUS',
    locale: 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE',
    recentSearches: 'waters.recentsearches'
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const cookieStore = {
    getLoggedInStatus: () => getCookie(keys.loggedInStatus),
    getSoldToStatus: () => getCookie(keys.soldToStatus),
    getLocale: () => getCookie(keys.locale),
    setLocale: () => {
        if(DigitalData.country===DigitalData.globalExperience){
            return;
        }
        const locale = `${DigitalData.language}_${DigitalData.country}`;
        const cookieName = keys.locale;
        const existingCookie = getCookie(cookieName);
        if(!existingCookie || existingCookie!==locale) {
            document.cookie = `${cookieName}=${locale}; path=/`;
        }
    },
    getRecentSearches: () => {
        const cookieValue = getCookie(keys.recentSearches)
        return cookieValue ? JSON.parse(cookieValue) : [];
    },
    setRecentSearches: (keyword, searchCount = 5) => {
        const cookieName = keys.recentSearches;
        const existingCookie = getCookie(cookieName);
        const searchKeywords = existingCookie ? JSON.parse(existingCookie) : [];
        // 30 Days expiry time
        const expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
        if (searchKeywords.indexOf(keyword) !== -1) {
            return;
        }
        searchKeywords.unshift(keyword);
        if (searchKeywords.length >= searchCount )
            searchKeywords.splice(searchCount, );
        document.cookie = `${cookieName}=${JSON.stringify(searchKeywords)}; path=/; expires=${expires.toUTCString()}`;
    }
}

export default cookieStore;