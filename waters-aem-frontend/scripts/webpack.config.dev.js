const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackSlangPlugin = require('./webpack-slang/index');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    entry: {
        main: './src/entry.js',
        print: './src/printEntry.js'
    },
    output: {
        path: path.resolve(__dirname, '../', 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new WebpackSlangPlugin({
            cssPath: '/apps/waters/clientlibs/clientlib-site/css',
            jsPath: '/apps/waters/clientlibs/clientlib-site/js',
            printCssPath: '/apps/waters/clientlibs/clientlib-print/css',
            printJsPath: '/apps/waters/clientlibs/clientlib-print/js',
            additionalHTML: [
                'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components',
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                mainStyles: {
                    name: 'main',
                    test: (m, c, entry = 'main') =>
                    m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
                printStyles: {
                    name: 'print',
                    test: (m, c, entry = 'print') =>
                    m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        minimize: false,
    },
};
