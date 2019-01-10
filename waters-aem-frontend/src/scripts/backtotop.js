var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect()

    return distance.top <= document.documentElement.clientHeight
}

var goTopBtn = document.querySelector('.cmp-back-to-top')

window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function scrollToY(scrollTargetY, speed, easing) {
    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0

    var time = Math.max(
        0.1,
        Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
    )

    var easingEquations = {
        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2))
        },
        easeInOutSine: function(pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1)
        },
        easeInOutQuint: function(pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5)
            }
            return 0.5 * (Math.pow(pos - 2, 5) + 2)
        },
    }

    function tick() {
        currentTime += 1 / 60

        var p = currentTime / time
        var t = easingEquations[easing](p)

        if (p < 1) {
            requestAnimFrame(tick)

            window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t)
        } else {
            window.scrollTo(0, scrollTargetY)
        }
    }

    tick()
}

function trackScroll() {
    var scrolled = window.pageYOffset
    var coords = document.documentElement.clientHeight
    var footer = document.querySelector('.cmp-external-footer')

    if (scrolled > coords * 2) {
        goTopBtn.classList.add('cmp-back-to-top-show')
    }

    if (scrolled < coords) {
        goTopBtn.classList.remove('cmp-back-to-top-show')
    }

    if (isInViewport(footer)) {
        goTopBtn.classList.add('cmp-back-to-top-affix')
    } else {
        goTopBtn.classList.remove('cmp-back-to-top-affix')
    }
}

window.addEventListener('scroll', trackScroll)
goTopBtn.addEventListener('click', () => {
    scrollToY(0, 1500, 'easeOutSine')
})
