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
                headStyles: {
                    name: 'head',
                    test: (m, c, entry = 'head') =>
                    m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
                node_vendors: {
                    name: 'node_vendors',
                    // test: /[\\/]node_modules[\\/]/,
                    test: /[\\/]node_modules[\\/](react|react-dom|prop-types|query-string|react-svg|react-router-dom|validator|react-paginate|whatwg-fetch)[\\/]/,
                    chunks: 'all',
                    priority: 1
                },
                utility: {
                    name: 'utility',
                    test: /[\\/]utils[\\/]/,
                    chunks: 'all',
                    priority: 1
                }
            },
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
