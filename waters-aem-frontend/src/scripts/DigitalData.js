const digitalDataDefaults = {
  language: 'en',
  country: 'XG'
};

const DigitalData = {
    get language() {
      return window.digitalData.page && window.digitalData.page.language
        ? window.digitalData.page.language
        : digitalData.language;
    },
    get country() {
        return window.digitalData.page && window.digitalData.page.country
        ? window.digitalData.page.country
        : digitalData.country;
    }
  };
  
  export default DigitalData;
  export {digitalDataDefaults};