import scrollToY from './scrollTo';
var anchorList = document.querySelector('.cmp-anchor__list');
var anchorElement = document.querySelector('.cmp-anchor');
//var anchorIcon = document.getElementsByClassName('.cmp-anchor__icon');
var anchorIcon = document.getElementsByClassName('.cmp-anchor__icon');

// Setup click handler for Anchor Links to scroll in view

var anchorLinks = document.querySelectorAll('.cmp-anchor__link');
let current = undefined;
anchorLinks.forEach((anchor, i) => {
    try {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            anchorElement.classList.add('cmp-anchor--sticky');
            setTimeout(() => {
                const href = e.target.getAttribute('href').replace(/#/gi, '');
                const block = document.getElementById(href);
                const blockTop = block.offsetTop;

                scrollToY(blockTop - 140, 1000, 'easeOutSine');

                anchorLinks.forEach(anchor => {
                    anchor.classList.remove('active');
                });

                anchor.classList.add('active');
            }, 0);
        });
    } catch (e) {
        // ignore
    }
});

// Sticky Nav Component
var anchorSticky = (function() {
    var CSS_CLASS_ACTIVE = 'cmp-anchor--sticky';

    var Sticky = {
        element: null,
        position: 0,
        addEvents: function() {
            window.addEventListener('scroll', this.onScroll.bind(this));
        },
        init: function(element) {
            this.element = element;
            this.addEvents();
            this.position = element.offsetTop;
            this.onScroll();

            this.anchorDestinations = [];
            // console.log('hello', anchorLinks.length);
            for (let i = 0; i <= anchorLinks.length; i++) {
                const anchor = anchorLinks[i];

                if (anchor) {
                    anchor.classList.remove('active');
                    this.anchorDestinations.push({
                        id: anchor.getAttribute('href'),
                        anchor: anchor,
                    });
                }
            }

            this.getInViewElement();
        },
        aboveScroll: function() {
            return this.position - 73 < window.scrollY;
        },
        onScroll: function(event) {
            if (this.aboveScroll()) {
                this.setFixed();
            } else {
                this.setRelative();
            }
            this.getInViewElement();
        },
        setFixed: function() {
            this.element.classList.add(CSS_CLASS_ACTIVE);
            anchorList.classList.add('cmp-anchor-hide');
            //anchorIcon.classList.add('active');
        },
        setRelative: function() {
            this.element.classList.remove(CSS_CLASS_ACTIVE);
            anchorList.classList.remove('cmp-anchor-hide');
            //anchorIcon.classList.remove('active');
        },

        getInViewElement: function() {
            // var distance = elem.getBoundingClientRect();
            // const isInView = distance.top <= document.documentElement.clientHeight;
            if (this.anchorDestinations) {
                let brokeAt = 0;
                for (let n = 0; n <= this.anchorDestinations.length; n++) {
                    const id = this.anchorDestinations[n].id.replace(/#/gi, '');
                    const link = this.anchorDestinations[n].anchor;
                    const element = document.getElementById(id);
                    const elementTop = element.getBoundingClientRect().top;
                    const docHeight = document.documentElement.clientHeight;
                    // console.log(elementTop, docHeight);
                    if (elementTop >= 75 && elementTop <= docHeight) {
                        link.classList.add('active');
                        brokeAt = n;
                        break;
                    } else {
                        link.classList.remove('active');
                    }
                }

                for (let i = 0; i <= this.anchorDestinations.length; i++) {
                    if (i !== brokeAt && this.anchorDestinations[i]) {
                        this.anchorDestinations[i].anchor.classList.remove(
                            'active'
                        );
                    }
                }
            }
        },
    };

    return Sticky;
})();

//  Init Sticky

if (anchorElement) anchorSticky.init(anchorElement);

function toggleMobileNav() {
    if (anchorList.classList.contains('cmp-anchor-hide')) {
        anchorList.classList.add('cmp-anchor-show');
        anchorList.classList.remove('cmp-anchor-hide');
        /*anchorIcon[1].classList.add('active');
        anchorIcon[0].classList.remove('active');*/
    } else {
        anchorList.classList.add('cmp-anchor-hide');
        anchorList.classList.remove('cmp-anchor-show');
        /* anchorIcon[0].classList.add('active');
        anchorIcon[1].classList.remove('active');*/
    }
    //element.classList.contains("highlighted")
}

window.addEventListener('scroll', anchorSticky);
anchorElement.addEventListener('click', toggleMobileNav);
