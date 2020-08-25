export const replaceTextWith = (el, transformationObject) => {
    const matches = el.innerHTML.match(/{{(.*?)}}/gi);

    Array.from(matches).forEach(match => {
        const key = match.replace('{{', '').replace('}}', '');
        el.innerHTML = el.innerHTML.replace(match, transformationObject[key]);
    });
}