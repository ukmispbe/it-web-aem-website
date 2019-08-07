// Stub our for shared utility functions

function dateFormatter(inputdate) {
    // TODO: Get locale from template when we are using the AEM templates. This data comes from the data-locale attribute on cmp-sku-details
    // const searchAppContainer = document.getElementById('cmp-sku-details'); // TODO: move this up somewhere better if we need to use locale in sku anywhere else
    const userLocale = 'en-US'
    if(inputdate){
        let splitDate = inputdate.split('-')
        let constructedDate = new Date(Date.UTC(splitDate[0], splitDate[1], splitDate[2]));
        return constructedDate.toLocaleDateString(userLocale, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    else {
        return '-';
    }

}

export default {
    dateFormatter: dateFormatter
}