addthis.addEventListener('addthis.menu.open', function () {
    var style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode('#at-expanded-menu-host .at-expanded-menu-mask { background-color: #2D3439; }'));

    document.head.appendChild(style);
});