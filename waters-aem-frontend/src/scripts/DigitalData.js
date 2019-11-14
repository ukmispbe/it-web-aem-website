const DigitalData = {
    get globalExperience() {
      return 'XG';
    },
    get language() {
      if (!window.DigitalData) return '';

      return window.digitalData.page && window.digitalData.page.language
        ? window.digitalData.page.language
        : "en";
    },
    get country() {
      if (!window.DigitalData) return '';

        return window.digitalData.page && window.digitalData.page.country
        ? window.digitalData.page.country
        : this.globalExperience;
    }
  };

export default DigitalData;