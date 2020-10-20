import getHeadScript from './head';
import getBodyScript from './body';

function oneTrustInit() {
    // inject in head
    var head = document.createElement('script');
    head.textContent = getHeadScript;
    document.head.appendChild(head);

    // inject in body
    var body = document.createElement('script');
    body.textContent = getBodyScript;
    document.body.appendChild(body);
}

window.addEventListener('load', oneTrustInit);