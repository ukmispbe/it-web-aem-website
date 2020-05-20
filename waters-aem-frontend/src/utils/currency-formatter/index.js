function currencyFormatter(amount, userLocale = 'en-US', inputcurrency = 'USD') {
    if (amount) {
        let formatter = new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: inputcurrency,
        });
        return formatter.format(amount);
    } else {
        return '-';
    }
}

export default {
    currencyFormatter: currencyFormatter
};