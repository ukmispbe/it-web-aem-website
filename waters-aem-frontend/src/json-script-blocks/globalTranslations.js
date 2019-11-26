const script = document.getElementById('global-translations-json');
const innerHtml = script ? script.innerHTML : '';
const GlobalTranslations = innerHtml ? JSON.parse(innerHtml) : {};

export default GlobalTranslations;