// main JS and SCSS entry file

import './styles/index.scss'
import './scripts/backtotop'
import './scripts/share'

var inlineSVG = require('inline-svg')

inlineSVG.init(
    {
        svgSelector: 'img.inline-svg', // the class attached to all images that should be inlined
        initClass: 'svg-inlined', // class added to <html>
    },
    function() {}
)
