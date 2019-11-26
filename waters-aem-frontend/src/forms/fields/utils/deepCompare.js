export const deepErrorsCompare = (obj, otherObj) => {
    if (typeof(obj) !== "object" || typeof(otherObj) !== "object") return false;

    if (Object.keys(obj).length !== Object.keys(otherObj).length) return false;

    for (let key in obj) {
        if (!otherObj.hasOwnProperty(key)) return false;

        for (let deepKey in obj[key]) {
            if (obj[key][deepKey] !== otherObj[key][deepKey]) return false;
        }
    }

    return true;
};

export const deepFormStateCompare = (obj, otherObj) => {
    if (typeof(obj) !== "object" || typeof(otherObj) !== "object") return false;

    if (Object.keys(obj).length !== Object.keys(otherObj).length) return false;
    for (let key in obj) {
        if (!otherObj.hasOwnProperty(key)) return false;

        if (typeof(obj[key]) === "object") {
            if (obj[key].length !== otherObj[key].length ||
                !obj[key].every(item => otherObj[key].includes(item))) return false;
        }
    }

    return true;
};