import "whatwg-fetch";

const POLICY_KEY = 'BCpkADawqM1m4GlNVBRuTcFVuPHqTd9akMFA2rJYhSPtDkhMSoSDRWNhOo3q5Wfquy9vooPMzTtjpR7RIzTyVpHa_a0YcXeFJWDnmau52-25MOFcM6s_rRWB-kY';

const brightCoveApi = (accountId, videoId) => `https://edge.api.brightcove.com/playback/v1/accounts/${accountId}/videos/${videoId}`;

export const getData = (url) => {
    return new Promise((resolve, reject) => {
        window
            .fetch(url,  
                {
                    method: "GET",
                    headers: {
                      Accept: `application/json;pk=${POLICY_KEY}`,
                    },
                }
            )
            .then(response => {
                resolve(response.json())
            })
            .catch(err => {
                reject(err);
            });
    });
}

export const getBrightCoveVideoData = async (videoIds, accountId, cb) => {
    const promises = [];
    videoIds.map( videoId => promises.push(getData(brightCoveApi(accountId, videoId))))
    Promise.all(promises).then(response => cb(response));
}