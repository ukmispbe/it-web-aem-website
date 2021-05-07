const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const entriesCSS = {
    container: './src/styles/container.scss',
    banner: './src/styles/banner.scss',
    teaser: './src/styles/teaser-index.scss',
    anchor: './src/styles/anchor.scss',
    features: './src/styles/features.scss',
    table: './src/styles/table.scss',
    taglist: './src/styles/taglist.scss',
    tiles: './src/styles/tiles.scss'
}

const entries = {
    main: './src/entry.js',
    print: './src/printEntry.js',
    head: './src/headEntry.js',
    global: './src/globalEntry.js'
}

module.exports = {
    entry: {...entries, ...entriesCSS},
    output: {
        path: path.resolve(__dirname, '../', 'build')
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: Infinity,
            cacheGroups: {
                reactVendor: {
                    name: 'react_vendors',
                    test: /[\\/]node_modules[\\/](react|react-dom|prop-types|query-string|react-svg|react-router|react-router-dom|validator|react-paginate|whatwg-fetch|react-autosuggest|react-html-parser|react-spinners|es6-promise|react-hook-form)[\\/]/,
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
                    test: /[\\/]utils|scripts|typography|stores[\\/]/,
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
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '/etc.clientlibs/waters/components/content/[name]/clientlib-[name].css',
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
