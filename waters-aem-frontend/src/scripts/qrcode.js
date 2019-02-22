var qrCode = require('qrcode');

var component = document.querySelector('.cmp-qr-code');
var url = component.dataset.url;

qrCode.toDataURL(url, function (err, url) {
    var img = document.createElement('img');

    img.src = url;
    img.setAttribute('class', 'cmp-qr-code__img');

    component.appendChild(img);
});