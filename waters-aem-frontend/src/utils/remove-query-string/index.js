function removeQString() {
    // get the string following the ?
    const query = window.location.search.substring(1);

    // is there anything there ?
    if (query.length) {
        // are the new history methods available ?
        if (window.history != undefined && window.history.pushState != undefined) {
            // if pushstate exists, add a new state to the history, this changes the url without reloading the page

            window.history.pushState({}, document.title, window.location.pathname);
        }
    }
}

export default removeQString;