function currencyFormatter(amount, inputcurrency = 'USD', userLocale = 'en-US') {
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