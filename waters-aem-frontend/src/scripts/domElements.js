const domElements = {
    getHeader: () => document.querySelector('.cmp-external-header'),
    getSortFilterhModal: () => document.querySelector('.cmp-search__sort-filter'),
    getCookie: (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
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
    }
}

function hasClassListSupport() {
    return 'classList' in document.documentElement;
}

export default domElements;