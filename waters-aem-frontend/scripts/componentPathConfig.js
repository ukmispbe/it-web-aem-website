const compConfig = [
    {
        aemCompName: 'forms',
    },
    {
        aemCompName: 'imagegallery',
    },
    {
        aemCompName: 'video',
    },
    {
        aemCompName: 'chat',
    }
]

const jsPathConfig = [];

for (let fileConfig of compConfig) {
    const { aemCompName } = fileConfig;
    const filePath = `waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components/content/${aemCompName}/clientlib-${aemCompName}`;

    jsPathConfig.push({
        aemPath: filePath,
        fileName: `${aemCompName}.js`
    });

    if (fileConfig.enableCSS === true) {
        jsPathConfig.push({
            aemPath: filePath,
            fileName: `${aemCompName}.css`
        });
    }

}

module.exports = {
    componentPathConfig: [...jsPathConfig]
}