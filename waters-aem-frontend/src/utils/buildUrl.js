const setUrlPathVariables = (url = "", pathVars = {}) => {
  let urlPath = url;
  if (!!urlPath) {
    for (const [key, value] of Object.entries(pathVars)) {
      urlPath = urlPath.replace(`{${key}}`, encodeURIComponent(value));
    }
  }
  return urlPath;
};

const createUrlSearchParams = (query = {}) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(query)) {
    queryParams.push(`${key}=${value}`);
  }
  return queryParams.join("&");
};

const buildUrl = (options) => {
  if (typeof options === "object") {
    const { pathname, query, pathVars } = options;
    let url = pathname;
    if (typeof pathVars === "object" && !!Object.keys(pathVars).length) {
      url = setUrlPathVariables(url, pathVars);
    }
    if (typeof query === "object" && !!Object.keys(query).length) {
      url += `?${createUrlSearchParams(query)}`;
    }
    return url;
  }
  return options;
};

export default buildUrl;
