import { getDataNoCredentials } from './retrieve';

export default function countryList(url) {
    return new Promise(async resolve => {
        try {
            const response = await getDataNoCredentials(url);
            const responseBody = await response.json();

            if (response.status === 200) {
                const countries = responseBody.map(x => ({ countryCode: x.code.toLowerCase(), displayName: x.name }))
                    .sort((a, b) => {
                        if (a.displayName > b.displayName) {
                            return 1;
                        } else if (b.displayName > a.displayName) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                return resolve({ response: countries });
            }
            return resolve({ response: [] });
        } catch (err) {
            console.error(err);
            return resolve({ response: [] });
        }
    });
}