const domElements = {
    getHeader: () => document.querySelector('.cmp-header'),
    getSortFilterhModal: () => document.querySelector('.cmp-search__sort-filter'),
    hasClass : (el, className) => {
        if (!el) {return false;}
        var classListSupport = hasClassListSupport();
    
        if (classListSupport) {
            return el.classList.contains(className);
        }
        return new RegExp('\\b' + className + '\\b').test(el.className);
    },
    addClass : (el, className) => {
        if (!el) {return;}
        if (hasClassListSupport()) {
            el.classList.add(className);
            return;
        }
        // fallback for non-classlist supported browsers
        if (!exports.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    },
    removeClass : (el, className) =>{
        if (!el) {return;}
        if (hasClassListSupport()) {
            el.classList.remove(className);
            return;
        }
        // fallback for non-classlist supported browsers
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    },
    noScroll: state => { 
        if (state) {
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
        } else { 
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    }
}

function hasClassListSupport() {
    return 'classList' in document.documentElement;
}

export default domElements;