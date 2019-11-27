var Slang = require('./slang');
var path = require('path');
var requireContext = require('require-context');

function WebpackSlangPlugin(options) {
    this.jsPath = options.jsPath;
    this.cssPath = options.cssPath;
    this.printJsPath = options.printJsPath;
    this.printCssPath = options.printCssPath;
    this.headJsPath = options.headJsPath;
    this.additionalFiles = [];

    options.additionalHTML.forEach(additionalFiles => {
        const req = requireContext(
            path.resolve(__dirname, '../../../') + '/' + additionalFiles,
            true,
            /.html$/
        );

        req.keys().forEach(p => {
            this.additionalFiles.push(
                path.resolve(__dirname, '../../../') +
                    '/' +
                    additionalFiles +
                    '/' +
                    p
            );
        });
    });

    Slang.setOptions({
        port: 4502,
        host: 'localhost',
        password: 'admin',
        username: 'admin',
    });
}

WebpackSlangPlugin.prototype.apply = function(compiler) {
    compiler.hooks.done.tap('WebpackSlang', stats => {
        for (const key in stats.compilation.assets) {
            const assetObj = stats.compilation.assets[key];

            if (key.includes('print')) {
                Slang.up(
                    assetObj.existsAt,
                    this[key.includes('js') ? 'printJsPath' : 'printCssPath'],
                    null,
                    key.includes('js') ? 'main.js' : 'main.css'
                );
            } else if (key.includes('head')) {
                Slang.up(
                    assetObj.existsAt,
                    this['headJsPath'],
                    null,
                    'head.js'
                );
            } else {
                Slang.up(
                    assetObj.existsAt,
                    this[key.includes('js') ? 'jsPath' : 'cssPath']
                );
            }
        }
    });

    compiler.hooks.emit.tapAsync('Add HTML', (compilation, callback) => {
        // console.log(compilation.contextDependencies);
        this.additionalFiles.forEach(file => {
            compilation.fileDependencies.add(file);
        });

        // console.log(compilation.fileDependencies);

        callback();
    });

    compiler.hooks.watchRun.tap('WatchRun', comp => {
        const changedTimes = comp.watchFileSystem.watcher.mtimes;

        Object.keys(changedTimes).forEach(file => {
            let p = file;

            if (file.indexOf('.html') >= 0 && file.indexOf('jcr_root') >= 0) {
                p = p.substring(p.indexOf('jcr_root') + 9);
                const filename = path.basename(p);
                Slang.up(file, p.replace(filename, ''), true);
                // console.log('Uploaded HTML Change: ', p);
            }
        });
    });
};

module.exports = WebpackSlangPlugin;
