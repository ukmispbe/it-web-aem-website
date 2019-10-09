function scrollToElement(scrollTargetElementID, speed, easing, ignorePadding=true, additionalOffset=0) {

    if (!scrollTargetElementID) { return; }

    speed = speed || 2000;
    easing = easing || 'easeOutSine';

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollTargetElement = document.getElementById(scrollTargetElementID);
    let bodyRect = document.body.getBoundingClientRect();

    if (!scrollTargetElement) { return; }

    let targetRect = scrollTargetElement.getBoundingClientRect();

    let currentTime = 0,
        currentOffset = getOffset();

    const time = Math.max(
        0.1,
        Math.min(Math.abs(scrollY - currentOffset) / speed, 0.8)
    );

    let easingEquations = {
        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function(pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        },
        easeInOutQuint: function(pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow(pos - 2, 5) + 2);
        },
    };

    function getPadding() {
        if (!ignorePadding) { return 0; }

        let padding = window.getComputedStyle(scrollTargetElement, null).getPropertyValue('padding-top');

        if (padding.indexOf('em') !== -1) {
            padding = padding.replace('em', '');
            padding *= 16;
        } else {
            padding = padding.replace('px', '');
            padding *= 1;
        }

        return padding;
    }

    function getOffset() {
        targetRect = scrollTargetElement.getBoundingClientRect();
        bodyRect = document.body.getBoundingClientRect();

        let tmpOffset = targetRect.top - bodyRect.top;
        tmpOffset += getPadding();
        tmpOffset -= additionalOffset;

        return tmpOffset;
    }

    function tick() {
        currentOffset = getOffset();
        currentTime += 1 / 60;

        let p = currentTime / time;
        let t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + (currentOffset - scrollY) * t);
        } else {
            window.scrollTo(0, currentOffset);
        }
    }

    tick();
}

module.exports = scrollToElement;