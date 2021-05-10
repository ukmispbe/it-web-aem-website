import "whatwg-fetch";

const getBrightCoveApi = (brightCoveApi, accountId, videoId) => {
  return  brightCoveApi.replace(/{accountId}/gi, accountId).replace(/{videoId}/gi, videoId);    
}

export const getData = (url, policyKey) => {
    return new Promise((resolve, reject) => {
        window
            .fetch(url,  
                {
                    method: "GET",
                    headers: {
                      Accept: `application/json;pk=${policyKey}`,
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

export const getBrightCoveVideoData = async (videoIds, accountId, brightCoveApi, policyKey, cb) => {
    const promises = [];
    videoIds.map( videoId => promises.push(getData(getBrightCoveApi(brightCoveApi, accountId, videoId),policyKey)))
    Promise.all(promises).then(response => cb(response));
}