const pdfPluginVerification = function() {
    const iframes = document.querySelectorAll('.cmp-iframe iframe');
    const noPDFPluginContainers = document.querySelectorAll('.no-pdf-plugin-container-ie');
    const browserName = getBrowserName();
    const pdfPlugin = getPDFPlugin();

    for(let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        const fileExtension = getFileExtension(iframe.src);

        if (fileExtension.toLowerCase() !== 'pdf' || browserName !== 'ie') continue;

        if (pdfPlugin) return;

        const noPDFPluginContainer = noPDFPluginContainers[i];

        iframe.classList.add('hide');

        noPDFPluginContainer.classList.remove('hide');
    }

    function getFileExtension(fileName){ 
        return fileName.split('.').pop(); 
    }

    function getUserAgent(){ 
        return navigator ? navigator.userAgent.toLowerCase() : "other"; 
    }

    function getBrowserName() {
        const userAgent = getUserAgent();

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

    function getActiveXObject(name) {
        try { 
            return new ActiveXObject(name); 
        } catch(e) {
            return null;
        };
    };

    function getPDFPlugin(){
        const names = ['AcroPDF.PDF', 'PDF.PdfCtrl'];

        for(let i = 0; i < names.length; i++) {
            const activeXObject = getActiveXObject(names[i]);

            if(activeXObject) return activeXObject;
        }

        return null;
    };
}

window.addEventListener('load', pdfPluginVerification);