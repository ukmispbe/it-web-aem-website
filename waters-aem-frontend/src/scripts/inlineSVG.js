import svgInline from '../utils/inline-svg/inline-svg';

const inlineSVG = {
    init: (svgSelector, initClass) => { 
        try {
            svgInline.init(
                {
                    svgSelector: svgSelector, // the class attached to all images that should be inlined
                    initClass: initClass, // class added to <html>
                },
                function () {}
            );
        } catch (e) {
            // console.log(e);
        }

    }
}

export default inlineSVG;