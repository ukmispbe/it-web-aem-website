const keys = {
    previousPagePosition: 'waters.previousPagePosition',
    fromSearchURL: 'waters.fromSearchURL',
    searchTabHistory: 'waters.searchTabHistory',
    previousPaginationClick: 'waters.previousPaginationClick'
}

const getJSONObject = key => {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : {};
}

const SessionStore = function() {
    this.setPreviousPagePosition = value => window.sessionStorage.setItem(keys.previousPagePosition, value);
    this.getPreviousPagePosition = () => window.sessionStorage.getItem(keys.previousPagePosition);
    this.removePreviousPagePosition = () => window.sessionStorage.removeItem(keys.previousPagePosition);
    this.setFromSearchURL = value => window.sessionStorage.setItem(keys.fromSearchURL, JSON.stringify(value));
    this.getFromSearchURL = () => getJSONObject(keys.fromSearchURL);
    this.removeFromSearchURL = () => window.sessionStorage.removeItem(keys.fromSearchURL);
    this.setSearchTabHistory = value => window.sessionStorage.setItem(keys.searchTabHistory, JSON.stringify(value));
    this.getSearchTabHistory = () => getJSONObject(keys.searchTabHistory);
    this.removeSearchTabHistory = () => window.sessionStorage.removeItem(keys.searchTabHistory);
    this.setPreviousPaginationClick = value => window.sessionStorage.setItem(keys.previousPaginationClick, value);
    this.getPreviousPaginationClick = () => window.sessionStorage.getItem(keys.previousPaginationClick);
    this.removePreviousPaginationClick = () => window.sessionStorage.removeItem(keys.previousPaginationClick);
}

export default SessionStore;