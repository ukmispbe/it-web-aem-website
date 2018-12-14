const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const fs = require('fs');
const path = require('path');

const compiler = webpack(Object.assign({}, config, {watch: process.env.WATCH_ALIVE === 'true' }));

compiler.run((err, stats) => {
    console.log("Compiler Finished, moving files to AEM");
    const css = path.resolve(__dirname, '../', 'build', 'main.css');
    const js = path.resolve(__dirname, '../', 'build', 'main.js');
    const aemCssPath = path.resolve(__dirname, '../../', 'waters-aem-ui.apps/src/main/content/jcr_root/etc/designs/waters', 'main.css');
    const aemJsPath = path.resolve(__dirname, '../../', 'waters-aem-ui.apps/src/main/content/jcr_root/etc/designs/waters', 'main.js');

    fs.rename(css, aemCssPath, (err) => {
        if (err) {
            console.log(err);
        }

        console.log('CSS Moved to AEM');
    });

    fs.rename(js, aemJsPath, (err) => {
        if (err) {
            console.log(err);
        }

        console.log('JS Moved to AEM');
    });
});