/**
 * Builds Resource data
 * @param {Array} data 
 * @returns Array
 */
const formData = data => {
    const { num_found } = data;
    if (num_found > 0) {
        const { documents } = data;
        return documents.reduce((acc, item) => {
            acc.push({
                title: item.title,
                url: item.url,
                yearpublished_facet: item.yearpublished_facet ? item.yearpublished_facet.replace('[', '').replace(']', '') : ''
            });
            return acc;
        }, []);
    } else {
        return [];
    }
}

/**
 * Fetches data from given url
 * @param {String} url 
 * @returns {Object} 
 */
const getResourcesData = async url => {
    const callService = window.fetch(url).then(res => res.json());
    const data = await callService;
    const response = { numFound: data.num_found };
    response.documents = formData(data);
    return response;
};

export default getResourcesData;