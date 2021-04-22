const compConfig = [
    {
        aemCompName: 'forms',
        enableCSS: true
    },
    {
        aemCompName: 'imagegallery',
        enableCSS: true
    },
    {
        aemCompName: 'video'
    },
    {
        aemCompName: 'chat'
    },
    {
        aemCompName: 'myaccount',
        enableCSS: true
    },
    {
        aemCompName: 'quickorder'
    },
    {
        aemCompName: 'searchresults',
        enableCSS: true
    },
    {
        aemCompName: 'skudetails',
        enableCSS: true
    },
    {
        aemCompName: 'skulist'
    },
    {
        aemCompName: 'usergreetings'
    }
];

const cssConfig = [
    {
        aemCompName: 'container'
    },
    {
        aemCompName: 'banner'
    },
    {
        aemCompName: 'teaser'
    },
    {
        aemCompName: 'anchor'
    },
    {
        aemCompName: 'features'
    },
    {
        aemCompName: 'table'
    },
    {
        aemCompName: 'taglist'
    },
    {
        aemCompName: 'tiles'
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
            fileName: `${aemCompName}.css`,
            filePath: `etc.clientlibs/waters/components/content/${aemCompName}/clientlib-${aemCompName}.css`
        });
    }
}

for (let fileConfig of cssConfig) {
    const { aemCompName } = fileConfig;
    const aemCompPath = (aemCompName === 'table' || aemCompName === 'taglist') ? `applicationnotes/${aemCompName}` : aemCompName;
    const filePath = `waters-aem-ui.apps/src/main/content/jcr_root/apps/waters/components/content/${aemCompPath}/clientlib-${aemCompName}`;

    jsPathConfig.push({
        aemPath: filePath,
        fileName: `${aemCompName}.css`
    });
}
module.exports = {
    componentPathConfig: [...jsPathConfig]
}