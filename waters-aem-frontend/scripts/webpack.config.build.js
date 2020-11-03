const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
        print: './src/printEntry.js',
        head: './src/headEntry.js',
        global: './src/globalEntry.js'
    },
    output: {
        path: path.resolve(__dirname, '../', 'build')
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: Infinity,
            cacheGroups: {
                reactVendor: {
                    name: 'react_vendors',
                    test: /[\\/]node_modules[\\/](react|react-dom|prop-types|query-string|react-svg|react-router|react-router-dom|validator|react-paginate|whatwg-fetch|react-autosuggest|react-autowhatever|react-html-parser|react-spinners|es6-promise|react-hook-form)[\\/]/,
                    chunks: 'all',
                    priority: 3
                },
                vendor: {
                    name: 'node_vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 2
                },
                utility: {
                    name: 'utility',
                    test: /[\\/]utils[\\/]/,
                    chunks: 'all',
                    priority: 3
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
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
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
};
