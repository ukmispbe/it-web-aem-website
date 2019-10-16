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

const clientlibPrintPath =
    'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-print';

compiler.run((err, stats) => {
    if (err) {
        console.log(err);
    }

    if (stats.compilation.errors && stats.compilation.errors.length) {
        console.error(stats.compilation.errors);
        process.exit(1);
        return;
    }

    console.log('Compiler Finished, moving files to AEM');
    const css = path.resolve(__dirname, '../', 'build', 'main.css');
    const printCss = path.resolve(__dirname, '../', 'build', 'print.css');
    const js = path.resolve(__dirname, '../', 'build', 'main.js');
    const printJs = path.resolve(__dirname, '../', 'build', 'print.js');
    const aemCssPath = path.resolve(
        __dirname,
        '../../',
        clientlibPath + '/css',
        'main.css'
    );
    const aemPrintCssPath = path.resolve(
        __dirname,
        '../../',
        clientlibPrintPath + '/css',
        'main.css'
    );
    const aemJsPath = path.resolve(
        __dirname,
        '../../',
        clientlibPath + '/js',
        'main.js'
    );
    const aemPrintJsPath = path.resolve(
        __dirname,
        '../../',
        clientlibPrintPath + '/js',
        'main.js'
    );

    fs.rename(css, aemCssPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('CSS Moved to AEM');
    });

    fs.rename(printCss, aemPrintCssPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Print CSS Moved to AEM');
    });

    fs.rename(js, aemJsPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('JS Moved to AEM');
    });

    fs.rename(printJs, aemPrintJsPath, err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Print JS Moved to AEM');
    });
});
