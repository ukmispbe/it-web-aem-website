// main JS and SCSS entry file

import './styles/index.scss'

// JS Code below
/*!
 * Determine if an element is in the viewport
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */
var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect()
    // console.log(
    //     distance.bottom <=
    //         (window.innerHeight || document.documentElement.clientHeight),
    //     distance.top,
    //     document.documentElement.clientHeight,
    //     distance.bottom
    // )
    return distance.top <= document.documentElement.clientHeight
}

var inlineSVG = require('inline-svg')

inlineSVG.init(
    {
        svgSelector: 'img.inline-svg', // the class attached to all images that should be inlined
        initClass: 'svg-inlined', // class added to <html>
    },
    function() {}
)

var goTopBtn = document.querySelector('.cmp-back-to-top')

function trackScroll() {
    var scrolled = window.pageYOffset
    var coords = document.documentElement.clientHeight
    var footer = document.querySelector('.cmp-external-footer')

    let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    )

    if (scrolled > coords * 2) {
        goTopBtn.classList.add('cmp-back-to-top-show')
    }

    if (scrolled < coords) {
        goTopBtn.classList.remove('cmp-back-to-top-show')
    }

    if (isInViewport(footer)) {
        goTopBtn.classList.add('cmp-back-to-top-affix')
    } else {
        goTopBtn.classList.remove('cmp-back-to-top-affix')
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80)
        setTimeout(backToTop, 0)
    }
}

window.addEventListener('scroll', trackScroll)
goTopBtn.addEventListener('click', backToTop)
