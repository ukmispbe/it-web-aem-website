window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

let last_known_scroll_position = 0;
let ticking = false;

class Sticky {
    sumHeight = 0;
    currentStickyClasses = [];
    constructor() {
        this.queue = [];
        this.attachedFunctions = [];
        this.current = [];
    }

    init() {
        window.addEventListener('scroll', this.watch.bind(this));
    }

    throttle(cb) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimFrame(() => {
                cb();
                ticking = false;
            });

            ticking = true;
        }
    }

    decideToStick(offset, position, height, parent) {
        let attach = false;
        switch (offset.position) {
            case 'bottom':
                if (position.top - offset.amount + height <= 0) {
                    attach = true;
                }
                break;
            case 'top':
                if (parent.getBoundingClientRect().top + offset.amount <= 0) {
                    attach = true;
                } else if (
                    position.x <= 0 &&
                    parent.getBoundingClientRect().y <= 0
                ) {
                    attach = true;
                }
                break;
            default:
                attach = false;
        }

        return attach;
    }

    watch(e) {
        this.throttle(() => {
            if (this.queue && this.queue.length) {
                this.queue.forEach(q => {
                    const position = q.element.getBoundingClientRect();

                    if (
                        this.decideToStick(
                            q.offset,
                            position,
                            q.boundingClient.height,
                            q.element.parentNode
                        )
                    ) {
                        const conditionalCheck = q.conditions;
                        if (typeof conditionalCheck === 'function') {
                            if (conditionalCheck(q.element)) {
                                this.stick(q);
                            } else { 
                                this.unstick(q);
                            }
                        } else { 
                            this.stick(q);
                        }
                    } else {
                        this.unstick(q);
                    }
                });
            }

            if (this.attachedFunctions && this.attachedFunctions.length) {
                this.attachedFunctions.forEach(fn => {
                    fn(e);
                });
            }
        });
    }

    stick(el) {
        if (!el.sticky) {
            el.sticky = true;

            let currentSticky = [];
            let hasStickyWith = [];

            this.queue.forEach(q => {
                if (q.sticky) {
                    currentSticky.push(q);
                    this.currentStickyClasses.push(q.modifier);
                    q.element.classList.remove(q.modifier);
                    q.element.classList.remove(q.modifier + '--shadow');
                } else if (q.stickyWith) {
                    hasStickyWith.push(q);
                }
            });

            if (hasStickyWith) {
                hasStickyWith.forEach(hs => {
                    if (this.currentStickyClasses.includes(hs.stickyWith)) {
                        hs.sticky = true;
                        currentSticky.push(hs);
                    }
                });
            }

            this.sumHeight = 0;

            currentSticky.sort((a, b) => {
                if (a.priority < b.priority) {
                    return -1;
                } else if (b.priority < a.priority) {
                    return 1;
                }

                return 0;
            });

            currentSticky.forEach((q, index) => {
                const boundingClient = q.element.getBoundingClientRect();
                const rect = Object.assign(
                    {},
                    {
                        height: boundingClient.height,
                    }
                );

                // set height on parent to avoid page jump
                q.element.parentNode.style.height =
                    rect.height + q.fillHeight + 'px';

                q.element.parentNode.classList.add(
                    `current-sticky-${q.modifier}`
                );

                q.element.classList.add(q.modifier);

                if (index === 0) {
                    this.addTopPositioning(q, '0px');
                    if (currentSticky.length === 1) {
                        q.element.classList.add(q.modifier + '--shadow');
                    }
                } else if (index === currentSticky.length - 1) {
                    this.addTopPositioning(q, `${this.sumHeight}px`);
                    q.element.classList.add(q.modifier + '--shadow');
                } else {
                    this.addTopPositioning(q, `${this.sumHeight}px`);
                }

                this.sumHeight += q.stickyHeight;
            });
        }
    }

    unstick(el) {
        if (
            (el.sticky && !el.stickyWith) ||
            (el.sticky &&
                el.stickyWith &&
                this.currentStickyClasses.indexOf(el.stickyWith) === -1)
        ) {
            el.element.style.opacity = 0;
            el.element.style.top = '';
            el.element.parentNode.style.height = '';
            el.element.parentNode.classList.remove(
                `current-sticky-${el.modifier}`
            );

            if (this.currentStickyClasses.length > 1) {
                this.addBottomShadow();
            }

            el.element.classList.remove(el.modifier + '--shadow');

            el.element.classList.remove(el.modifier);

            this.currentStickyClasses.splice(
                this.currentStickyClasses.indexOf(el.modifier),
                1
            );

            setTimeout(() => {
                el.element.style.opacity = 1;
            }, 100);

            el.sticky = false;
           for (let i = 0; i < this.queue.indexOf(el); i++) {
              let pastEl = this.queue[i];

              if (pastEl && pastEl.sticky && pastEl.stickyWith === el.modifier && this.currentStickyClasses.indexOf(pastEl.modifier) == -1) {
                 pastEl.element.style.opacity = 0;
                 pastEl.element.style.top = '';
                 pastEl.element.parentNode.style.height = '';
                 pastEl.element.parentNode.classList.remove(
                     `current-sticky-${pastEl.modifier}`
                 );

                 if (this.currentStickyClasses.length > 1) {
                    this.addBottomShadow();
                 }

                 pastEl.element.classList.remove(pastEl.modifier + '--shadow');

                 pastEl.element.classList.remove(pastEl.modifier);

                 setTimeout(() => {
                    pastEl.element.style.opacity = 1;
                 }, 100);

                 pastEl.sticky = false;
              }
           }
        } else {
            if (!el.element.classList.contains(el.modifier)) {
                el.element.classList.remove(el.modifier + '--shadow');
            }
        }
    }

    addTopPositioning(el, position) {
        if (el.element.classList.contains('cmp-sku-details')) {
            el.element.children[0].style.top = position;
        } else {
            el.element.style.top = position;
        }
    }

    addBottomShadow() {
        let bottomElement = {};

        this.queue.forEach(q => {
            if (!bottomElement.priority & q.sticky) {
                bottomElement = q;
            } else if (
                bottomElement.priority &&
                bottomElement.priority >= q.priority
            ) {
                bottomElement = q;
            }
        });

        if (bottomElement.element) {
            bottomElement.element.classList.add(
                bottomElement.modifier + '--shadow'
            );
        }
    }

    add(el) {
        if (!this) {
            return wait(sticky.add(el));
        }

        if (!el.element) {
            return;
        }

        const rect = el.element.getBoundingClientRect();
        el.boundingClient = Object.assign(
            {},
            {
                bottom: rect.bottom,
                height: rect.height,
                left: rect.left,
                right: rect.right,
                top: rect.top,
                width: rect.width,
                x: rect.x,
                y: rect.y,
            }
        );

        this.queue.push(el);
    }

    attachToScrollListener(fn) {
        if (!this || !this.attachedFunctions) {
            return wait(sticky.attachToScrollListener(fn));
        }

        try {
            this.attachedFunctions.push(fn);
        } catch (e) {
            wait(sticky.attachToScrollListener(fn));
        }
    }

    findStickyEl(element) { 
        let stickyService = null;
        if (this.queue && this.queue.length) {
            for (let q = 0; q < this.queue.length; q++) {
                if (this.queue[q].element == element) { 
                    stickyService = this.queue[q];
                    break;
                }
            }
        }
        return stickyService;
    }
}

const sticky = new Sticky();

document.addEventListener('DOMContentLoaded', () => {
    sticky.init();
});

function wait(fn) {
    setTimeout(fn, 50);
}

export default sticky;
export const scrollListener = sticky.attachToScrollListener;
