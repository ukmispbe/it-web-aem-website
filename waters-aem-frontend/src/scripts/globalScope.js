const GlobalScope = {
    get language() {
      return window.digitalData && window.digitalData.language
        ? window.digitalData.language
        : "en";
    }
  };
  
  export default GlobalScope;