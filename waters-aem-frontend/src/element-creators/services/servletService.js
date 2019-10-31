import DigitalData from "../../scripts/DigitalData";
import DateRange from "../../scripts/dateRange";

const basePath = "/bin/waters/";

const ServletService = {
  getSystemWideNotification: async function() {
    return this.fetchSystemWideNotification()
      .then(data => this.mapSystemWideNotification(data))
      .catch(error => {
        return {
          enabled: false,
          title: error.message
        };
      });
  },
  fetchSystemWideNotification: async function() { 
    return fetch(`${basePath}notifications.${DigitalData.language}.json`).then(response => response.json())
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
