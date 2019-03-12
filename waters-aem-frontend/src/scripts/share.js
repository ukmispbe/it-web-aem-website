addthis.addEventListener('addthis.ready', function () {
    var share = document.querySelector('.cmp-share');

    if (share) {
        var baseUrl = share.getAttribute('data-base-url');
        share.classList.remove('hidden');
        addthis_share.url = baseUrl + window.location.pathname + window.location.search;
    }
});

addthis.addEventListener('addthis.menu.open', function () {
    var style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode('#at-expanded-menu-host .at-expanded-menu-mask { background-color: #2D3439; }'));

    document.head.appendChild(style);
});