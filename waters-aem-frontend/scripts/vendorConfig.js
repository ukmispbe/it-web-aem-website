const vendorConfig = {
    utility: {
        name: 'utility',
        test: /[\\/]utils|scripts|typography|stores[\\/]/,
        chunks: 'all',
        priority: 3
    },
    reactVendor: {
        name: 'react_vendors',
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    propVendor: {
        name: 'react_prop_vendors',
        test: /[\\/]node_modules[\\/](prop-types|query-string|react-svg|react-router|react-router-dom|validator|react-paginate|whatwg-fetch|react-html-parser|react-spinners|es6-promise)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    nodeVendor: {
        name: 'node_vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        priority: 2
    },
    coreJSVendor: {
        name: 'core_js_vendors',
        test: /[\\/]node_modules[\\/](core-js)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    reactSelectVendor: {
        name: 'react_select_vendors',
        test: /[\\/]node_modules[\\/](react-select)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    hammerVendor: {
        name: 'hammer_js_vendors',
        test: /[\\/]node_modules[\\/](hammerjs)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    reactAutosuggestVendor: {
        name: 'react_autosuggest_vendors',
        test: /[\\/]node_modules[\\/](react-autosuggest|react-autowhatever)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    reactHookFormVendor: {
        name: 'react-hook-form_vendors',
        test: /[\\/]node_modules[\\/](react-hook-form|react-google-recaptcha)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    cssPonyfillVendor: {
        name: 'css_ponyfill_vendors',
        test: /[\\/]node_modules[\\/](css-vars-ponyfill)[\\/]/,
        chunks: 'all',
        priority: 3
    },
    reactPlayerVendor: {
        name: 'react_player_vendors',
        test: /[\\/]node_modules[\\/](@brightcove)[\\/]/,
        chunks: 'all',
        priority: 3
    },

};

module.exports = vendorConfig;