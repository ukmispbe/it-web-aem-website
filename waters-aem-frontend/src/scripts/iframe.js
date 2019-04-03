window.onload = () => {
    const iframes = document.querySelectorAll('.cmp-iframe iframe');
    const noPDFPluginContainers = document.querySelectorAll('.no-pdf-plugin-container-ie');

    for(let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        const fileExtension = IframeHelper.getFileExtension(iframe.src);

        if (fileExtension.toLowerCase() !== 'pdf') break;
        
        const browserName = IframeHelper.getBrowserName();

        if (browserName !== 'ie') break;

        const pdfPlugin = IframeHelper.getPDFPlugin();

        if (pdfPlugin) return;

        iframe.classList.add('hide');

        const noPDFPluginContainer = noPDFPluginContainers[i];

        noPDFPluginContainer.classList.remove('hide');
    }
}

class IframeHelper {
    static getFileExtension = (fileName) => fileName.split('.').pop();
    static getUserAgent = () => navigator ? navigator.userAgent.toLowerCase() : "other";
    static getBrowserName = () => {
        const userAgent = IframeHelper.getUserAgent();

        if(userAgent.indexOf("chrome") > -1){
            return "chrome";
        } else if(userAgent.indexOf("safari") > -1){
            return "safari";
        } else if(userAgent.indexOf("msie") > -1 || navigator.appVersion.indexOf('Trident/') > 0){
            return "ie";
        } else if(userAgent.indexOf("firefox") > -1){
            return "firefox";
        } else {
            return userAgent;
        }
    };
    static getActiveXObject = (name) => {
        try { return new ActiveXObject(name); } catch(e) {};
    };
    static getPDFPlugin = () => {
        const names = ['AcroPDF.PDF', 'PDF.PdfCtrl'];

        for(let i = 0; i < names.length; i++) {
            const activeXObject = IframeHelper.getActiveXObject(names[i]);

            if(activeXObject) return activeXObject;
        }
    };
}