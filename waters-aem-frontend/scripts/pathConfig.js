const componentPathConfig = require('./componentPathConfig.js');
const componentConfig = componentPathConfig.componentPathConfig;

const jsConfig = [
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-site',
    fileName: 'main.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-print',
    fileName: 'print.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-head',
    fileName: 'head.js' 
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-global',
    fileName: 'global.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-vendors',
    fileName: 'node_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_vendors',
    fileName: 'react_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-utility',
    fileName: 'utility.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-corejs_vendors',
    fileName: 'core_js_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-css_ponyfill_vendors',
    fileName: 'css_ponyfill_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-hammer_js_vendors',
    fileName: 'hammer_js_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_autosuggest_vendors',
    fileName: 'react_autosuggest_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_player_vendors',
    fileName: 'react_player_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_select_vendors',
    fileName: 'react_select_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_hook_form_vendors',
    fileName: 'react-hook-form_vendors.js'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-react_prop_vendors',
    fileName: 'react_prop_vendors.js'
  },
];

const cssConfig = [
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-site',
    fileName: 'main.css'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-print',
    fileName: 'print.css'
  },
  {
    aemPath: 'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-global',
    fileName: 'global.css'
  }
]

module.exports = {
  pathConfig: [...jsConfig, ...cssConfig, ...componentConfig]
}