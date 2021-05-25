const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const vendorConfig = require('./vendorConfig.js');

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
            cacheGroups: vendorConfig
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
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
