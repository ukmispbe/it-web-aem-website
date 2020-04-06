const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackLifecyclePlugin = require('./webpack-lifecycle/index');
const requireContext = require('require-context');
const { push } = require('aemsync');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const targets = [
    'http://admin:admin@localhost:4502'
    // uncomment if running a publish instance alongside author
    // 'http://admin:admin@localhost:4503'
];

module.exports = {
    entry: {
        main: './src/entry.js'
        // print: './src/printEntry.js',
        // head: './src/headEntry.js'
    },
    output: {
        path: path.resolve(
            __dirname,
            '../../',
            'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-site'
        )
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
        new WebpackLifecyclePlugin({
            emit: {
                type: 'tapAsync',
                cb: (compilation, callback) => {
                    const req = requireContext(
                        path.resolve(__dirname, '../../') +
                            '/' +
                            'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components',
                        true,
                        /.html$/
                    );

                    console.log(
                        path.resolve(
                            __dirname,
                            '../../',
                            'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/clientlibs/clientlib-site'
                        )
                    );

                    req.keys().forEach(p => {
                        compilation.fileDependencies.add(
                            path.resolve(
                                __dirname,
                                '../../',
                                'waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components',
                                p
                            )
                        );
                    });

                    callback();
                }
            },
            done: {
                type: 'tap',
                cb: stats => {
                    for (const key in stats.compilation.assets) {
                        const assetObj = stats.compilation.assets[key];

                        // webpack doesn't allow mutliple outputs to be named according to our current clientlibs setup.
                        // so for now, we are only pushing main.js and main.scss to AEM on watch
                        if (key.includes('print')) {
                            console.log(
                                'PRINT FILE - NOT PUSHED TO AEM - RUN MAVEN BUILD',
                                assetObj.existsAt
                            );
                        } else if (key.includes('head')) {
                            console.log(
                                'HEAD FILE - NOT PUSHED TO AEM - RUN MAVEN BUILD',
                                assetObj.existsAt
                            );
                        } else {
                            // add if so it's not attempting 2 uploads of the same directory
                            if (key.includes('js')) {
                                push(path.dirname(assetObj.existsAt), {
                                    targets,
                                    onPushEnd: (err, target, log) => {},
                                    checkBeforePush: true
                                });
                            }
                        }
                    }
                }
            },
            watchRun: {
                type: 'tap',
                cb: comp => {
                    const changedTimes = comp.watchFileSystem.watcher.mtimes;

                    Object.keys(changedTimes).forEach(file => {
                        if (
                            file.indexOf('.html') >= 0 &&
                            file.indexOf('jcr_root') >= 0
                        ) {
                            push(path.dirname(file), {
                                targets,
                                onPushEnd: (err, target, log) => {},
                                checkBeforePush: true
                            });
                        }
                    });
                }
            }
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                mainStyles: {
                    name: 'main',
                    test: (m, c, entry = 'main') =>
                        m.constructor.name === 'CssModule' &&
                        recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                printStyles: {
                    name: 'print',
                    test: (m, c, entry = 'print') =>
                        m.constructor.name === 'CssModule' &&
                        recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                headStyles: {
                    name: 'head',
                    test: (m, c, entry = 'print') =>
                        m.constructor.name === 'CssModule' &&
                        recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimize: false
    }
};
