import screenSizes from '../scripts/screenSizes';

const navigationLevel2 = function () {
    const maxColumnCount = 3;
    const linksPerColumn = 8;
    const level0Groups = document.querySelectorAll('.cmp-navigation > .cmp-navigation__group > .cmp-navigation__item');

    Array.from(level0Groups).forEach(group => {
        const level1Group = group.querySelector('.cmp-navigation__group');

        if (level1Group) {
            const numberOfLinks = level1Group.querySelectorAll('.cmp-navigation__item').length;

            const columnCount = numberOfLinks === 0 ? 1 : Math.ceil(numberOfLinks / linksPerColumn);

            const className = `cmp-navigation__group--col-${columnCount > maxColumnCount ? maxColumnCount : columnCount}`;

            level1Group.classList.add(className);

        }

        const container = group.querySelector('.cmp-navigation__container')
        container.addEventListener('click', function (event) {
            const mainULNav = event.currentTarget.parentElement.parentElement;
            const level0Item = event.currentTarget.parentElement;
            const expanded = 'is-expanded';
            const active = 'is-active';
            if (screenSizes.isMobile()) {
                event.preventDefault();
                if (level0Item.classList.contains(active)) {
                    level0Item.classList.remove(active);
                    mainULNav.classList.remove(expanded);
                } else { 
                    level0Item.classList.add(active);
                    mainULNav.classList.add(expanded);
                }

                

            }
        });
    });
}



window.addEventListener('load', navigationLevel2);