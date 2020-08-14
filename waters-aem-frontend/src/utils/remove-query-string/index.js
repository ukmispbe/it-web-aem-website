const removeUrlPathVariable = (url, parameter) => {
    const urlParts = url.split('?');

    if (urlParts[1]) {
        const prefix = `${encodeURIComponent(parameter)}=`;
        const pars = urlParts[1].split(/[&;]/g);
        const filteredVariables = pars.filter(value => value.lastIndexOf(prefix) === -1);
        const pathVars = filteredVariables.length ? `?${filteredVariables.join('&')}` : '';
        return `${urlParts[0]}${pathVars}`;
    }
    return url;
};

const removeQueryString = (url, parameter, replaceHistory = false) => {
    try {
        const query = (window && window.location && window.location.search ? window.location.search : '').substring(1);
        if (
            query.length &&
            window.history !== undefined &&
            window.history.pushState !== undefined &&
            window.history.replaceState !== undefined
        ) {
            const filteredUrl = parameter
                ? removeUrlPathVariable(url, parameter)
                : window.location.pathname;
            if (replaceHistory) {
                window.history.replaceState({}, document && document.title ? document.title : '', filteredUrl);
            } else {
                window.history.pushState({}, document && document.title ? document.title : '', filteredUrl);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export default removeQueryString;