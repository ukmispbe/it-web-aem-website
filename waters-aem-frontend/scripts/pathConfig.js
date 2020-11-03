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
  }
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
  pathConfig: [...jsConfig, ...cssConfig]
}