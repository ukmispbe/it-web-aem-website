import DateRange from "../../scripts/dateRange";

const basePath = "/bin/waters/";

const ServletService = {
  getSystemWideNotification: async function(language) {
    return this.fetchSystemWideNotification(language)
      .then(data => this.mapSystemWideNotification(data))
      .catch(error => {
        return {
          enabled: false,
          title: error.message
        };
      });
  },
  fetchSystemWideNotification: async function(language) { 
    return fetch(`${basePath}notifications.${language}.json`).then(response => response.json())
  },
  mapSystemWideNotification: function(data) {
      return {
          enabled: data.message ? true : false,
          title: data.title,
          message: data.message,
          dateRange: new DateRange(data.onTime, data.offTime)
      }
  }
};

export default ServletService;
