const sessionKeys = {
    searchTerm: 'searchTerm'
}

export default class SessionService {
    setSearchTerm = value => sessionStorage.setItem(sessionKeys.searchTerm, value);
    getSearchTerm = () => sessionStorage.getItem(sessionKeys.searchTerm);
    removeSearchTerm = () => sessionStorage.removeItem(sessionKeys.searchTerm);
}