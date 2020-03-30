export const signInRedirect = () => {
    // Only redirect to sign in page if url contains "nextgen"
    const headerDiv = document.getElementById("header");
    const signInUrl = headerDiv.getAttribute("data-signin-url");;
    // Only redirect to sign in page if url contains "nextgen"
    if (signInUrl.includes("nextgen")){
        window.location.replace(signInUrl); 
    }
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