export const signInRedirect = () => {
    const headerDiv = document.getElementById("header");
    const signInUrl = headerDiv.getAttribute("data-signin-url");
    window.location.replace(signInUrl);
}

export const homePageRedirect = () => {
    const headerDiv = document.getElementById("header");
    const homePageUrl = headerDiv.getAttribute("data-homepage-url")
    window.location.replace(homePageUrl);
}