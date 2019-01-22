const webpack = require('webpack');
const config = require('./webpack.config.build.js');
const fs = require('fs');
const path = require('path');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const compiler = webpack(
    Object.assign({}, config, { watch: process.env.WATCH_ALIVE === 'true' })
);

const clientlibPath =
    'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-site';

compiler.run((err, stats) => {
    console.log('Compiler Finished, moving files to AEM');
    const css = path.resolve(__dirname, '../', 'build', 'main.css');
    const js = path.resolve(__dirname, '../', 'build', 'main.js');
    const aemCssPath = path.resolve(
        __dirname,
        '../../',
        clientlibPath + '/css',
        'main.css'
    );
    const aemJsPath = path.resolve(
        __dirname,
        '../../',
        clientlibPath + '/js',
        'main.js'
    );

    fs.rename(css, aemCssPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('CSS Moved to AEM');
    });

    fs.rename(js, aemJsPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('JS Moved to AEM');
    });
});
