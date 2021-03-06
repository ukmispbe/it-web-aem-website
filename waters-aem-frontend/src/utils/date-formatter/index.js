function dateFormatter(inputdate, userLocale = 'en-US') {
    if (inputdate && inputdate !== "0000-00-00") {
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

function monthDayFormatter(inputdate, userLocale = 'en-US') {
    if (inputdate && inputdate !== "0000-00-00") {
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
            month: 'long',
            day: 'numeric',
        });
    } else {
        return '-';
    }
}

export default {
    dateFormatter: dateFormatter,
    monthDayFormatter: monthDayFormatter,
};