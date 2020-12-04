const compConfig = [
    {
        aemCompName: 'forms'
    },
    {
        aemCompName: 'imagegallery'
    },
    {
        aemCompName: 'video'
    },
    {
        aemCompName: 'chat'
    },
    {
        aemCompName: 'myaccount'
    },
    {
        aemCompName: 'quickorder'
    },
    {
        aemCompName: 'usergreetings'
    }
];

const jsPathConfig = [];

for (let fileConfig of compConfig) {
    const { aemCompName, enableCSS } = fileConfig;
    const filePath = `waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components/content/${aemCompName}/clientlib-${aemCompName}`;

    jsPathConfig.push({
        aemPath: filePath,
        fileName: `${aemCompName}.js`
    });

    if (enableCSS === true) {
        jsPathConfig.push({
            aemPath: filePath,
            fileName: `${aemCompName}.css`
        });
    }
}

module.exports = {
    componentPathConfig: [...jsPathConfig]
}