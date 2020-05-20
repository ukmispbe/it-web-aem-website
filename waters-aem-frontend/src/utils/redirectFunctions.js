export const signInRedirect = () => {
    // Only redirect to sign in page if url contains "nextgen"
    const headerDiv = document.getElementById("header");
    const signInUrl = headerDiv.getAttribute("data-signin-url");
    // Only redirect to sign in page if url contains "nextgen"
    if (signInUrl.indexOf("nextgen") !== -1){
        window.location.replace(signInUrl); 
    }
}

export const getNamedHeaderLink = (dataId) => {
    const headerDiv = document.getElementById("header");
    const headerLink = headerDiv.getAttribute(dataId);
    return headerLink;
}

export const checkIfSameOrigin = (urlToCheck) => {
    var host = window.location.host;
    var sameOrigin = urlToCheck.indexOf(host);
    if ( sameOrigin >= 0 ) {
        return true;
    }
    return false;
}

export const notLoggedInRedirect = () => {
    const headerDiv = document.getElementById("header");
    const signInUrl = headerDiv.getAttribute("data-signin-url");
    window.location.replace(signInUrl); 
}

export const homePageRedirect = () => {
    const headerDiv = document.getElementById("header");
    const homePageUrl = headerDiv.getAttribute("data-homepage-url")
    window.location.replace(homePageUrl);
}