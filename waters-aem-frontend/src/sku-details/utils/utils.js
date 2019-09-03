// Stub our for shared utility functions

function dateFormatter(inputdate, userLocale = 'en-US') {
    if (inputdate) {
        let splitDate = inputdate.split('-');
        let constructedDate = new Date(
            Date.UTC(
                splitDate[0],
                parseInt(splitDate[1], 10) - 1,
                splitDate[2],
                12
            )
        );
        return constructedDate.toLocaleDateString(userLocale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } else {
        return '-';
    }
}

export default {
    dateFormatter: dateFormatter,
};
