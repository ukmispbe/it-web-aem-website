const script = document.getElementById('global-translations-json');
const innerHtml = script ? script.innerHTML : '';
const globalTranslations = innerHtml ? JSON.parse(innerHtml) : {};

export default globalTranslations;