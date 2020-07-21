function parseQueryParams(pathname) {
    const search = (pathname && pathname.split('?')[1]) || undefined;
    if (search) {
        const queryList = search.split('&');
        return queryList.reduce((accu, curr) => {
            const [key, value] = curr.split('=');
            return { ...accu, [key]: value.split('#')[0] };
        }, {});
    }
    return {};
}

export default parseQueryParams;