const DigitalData = {
    get language() {
      return window.digitalData.page && window.digitalData.page.language
        ? window.digitalData.page.language
        : "en";
    },
    get country() {
        return window.digitalData.page && window.digitalData.page.country
        ? window.digitalData.country
        : "XG";
    }
  };
  
  export default DigitalData;