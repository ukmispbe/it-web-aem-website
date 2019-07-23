const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackSlangPlugin = require('./webpack-slang/index');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = {
    entry: './src/entry.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../', 'build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new WebpackSlangPlugin({
            cssPath: '/etc/designs/waters',
            jsPath: '/apps/waters/clientlibs/clientlib-site/js',
            additionalHTML: [
                'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components',
            ],
        }),
    ],
    optimization: {
        minimize: false,
    },
};
