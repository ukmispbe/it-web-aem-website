import screenSizes from '../scripts/screenSizes';

const navigationLevel2 = function () {
    const maxColumnCount = 3;
    const linksPerColumn = 8;
    const headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation'); 
    const level0Groups = document.querySelectorAll('.cmp-navigation > .cmp-navigation__group > .cmp-navigation__item');

    const expanded = 'is-expanded';
    const active = 'is-active';

    Array.from(level0Groups).forEach(group => {
        const level1Group = group.querySelector('.cmp-navigation__group');

        if (level1Group) {
            const numberOfLinks = level1Group.children.length;

            const columnCount = numberOfLinks === 0 ? 1 : Math.ceil(numberOfLinks / linksPerColumn);

            const className = `cmp-navigation__group--col-${columnCount > maxColumnCount ? maxColumnCount : columnCount}`;

            level1Group.classList.add(className);

        }
        
        const container = group.querySelector('.cmp-navigation__container');
        container.addEventListener('click', function (event) {
            if (level1Group && level1Group.children.length !== 0) {
                if (screenSizes.isMobile()) {
                    event.preventDefault();
                    const mainULNav = event.currentTarget.parentElement.parentElement;
                    const level0Item = event.currentTarget.parentElement;

                    if (level0Item.classList.contains(active)) {
                        level0Item.classList.remove(active);
                        mainULNav.classList.remove(expanded);
                    } else {
                        level0Item.classList.add(active);
                        mainULNav.classList.add(expanded);
                    }
                }
            } else { 
                const linkURL = event.currentTarget.getElementsByTagName("a")[0].href;
                if (linkURL) { 
                    window.open (linkURL,'_self',false)
                }
            }
        });        
    });

    if (headerNavigation_comp) {
        window.addEventListener('resize', function () {
            if (!screenSizes.isMobile()) {
                Reset();
            }
        });
    }

}

window.addEventListener('load', navigationLevel2);

const Reset = () => {
    return function () {

        const expanded = 'is-expanded';
        const active = 'is-active';
        const level0Items = document.querySelectorAll('.cmp-navigation > .cmp-navigation__group > .cmp-navigation__item');
        const level0Group = document.querySelector('.cmp-navigation > .cmp-navigation__group');

        if (level0Items) { 
            Array.from(level0Items).forEach(level0Item => {
                if (level0Item.classList.contains(active)) {
                    level0Item.classList.remove(active)
                }
            })
        }

        if (level0Group) { 
            if (level0Group.classList.contains(expanded)) {
                level0Group.classList.remove(expanded)
            }
        }
    }
};

export default Reset;