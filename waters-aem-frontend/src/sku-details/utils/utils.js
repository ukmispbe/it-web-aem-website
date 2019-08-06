// Stub our for shared utility functions

function dateFormatter(inputdate) {
    // TODO: 
    // Eventually, we will get a ticket to set date format to local settings based on country, or let user pick date format
    // Example right now: availability date in stock app. Date comes from API as yyyy-mm-dd
    return inputdate;
}

export default {
    dateFormatter: dateFormatter
}