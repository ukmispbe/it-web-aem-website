var Slang = require('./slang');

function WebpackSlangPlugin(options) {
    this.jsPath = options.jsPath;
    this.cssPath = options.cssPath;

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
            // console.log('ASSET:', stats.compilation.assets[key] instanceof Set);
            const assetObj = stats.compilation.assets[key];
            const source =
                assetObj[key.includes('js') ? '_value' : '_cachedSource'];

            Slang.up(
                assetObj.existsAt,
                this[key.includes('js') ? 'jsPath' : 'cssPath']
            );
            // console.log('SOURCE', assetObj.existsAt);
        }
    });
};

module.exports = WebpackSlangPlugin;
