import categories from './categories';
import shopResults from './results.shop';
import libraryResults from './results.library';

const isocode = 'en_US';

const data = {
    categories,
    shop: {
        querystring: `?category=Shop&isocode=${isocode}`,
        results: shopResults
    },
    library: {
        querystring: `?category=Library&isocode=${isocode}`,
        results: libraryResults
    }
};

export default data;