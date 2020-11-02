const webpack = require('webpack');
const config = require('./webpack.config.build.js');
const fs = require('fs');
const path = require('path');

const pathConfig = require('./pathConfig.js');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const compiler = webpack(
    Object.assign({}, config, { watch: process.env.WATCH_ALIVE === 'true' })
);

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

    for (let fileConfig of pathConfig.pathConfig) {
        fs.rename(
            path.resolve(__dirname, '../', 'build', fileConfig.fileName),
            path.resolve(
                __dirname,
                '../../',
                fileConfig.aemPath,
                fileConfig.fileName
            ),
            err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`${fileConfig.fileName} Moved to AEM`);
            }
        );
    }
});
