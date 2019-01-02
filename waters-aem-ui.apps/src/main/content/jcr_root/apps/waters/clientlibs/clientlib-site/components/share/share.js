addthis.share({
    container_selector: '.cmp-share',
    button_selector: '.addthis_share_button'
}).addEventListener('addthis.menu.share', function (e) {
    if (e.data.service === 'link') {
        let tooltip = $('.cmp-share li[data-service="link"]').data('tooltip');

        if (typeof tooltip !== 'undefined') {
            // TODO replace with actual tooltip
            alert(tooltip);
        }
    }
});