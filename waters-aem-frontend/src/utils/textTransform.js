/**
 * Function is used to replace the placeholder text within the element using the transformationObject
 * @param {domElement} el DOM element
 * @param {object} transformationObject Object of key value pairs, key would maps placeholder and value would maps to text to be updated
 */
export const replaceTextWith = (el, transformationObject) => {
    const matches = el.innerHTML.match(/{{(.*?)}}/gi);

    Array.from(matches).forEach(match => {
        const key = match.replace('{{', '').replace('}}', '');
        el.innerHTML = el.innerHTML.replace(match, transformationObject[key]);
    });
}