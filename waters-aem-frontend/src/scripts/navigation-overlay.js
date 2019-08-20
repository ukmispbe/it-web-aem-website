import screenSizes from '../scripts/screenSizes';

let elem = document.querySelector('.cmp-navigation');

if (elem) {
   const overlay = document.createElement('div');
   overlay.classList.add('cmp-navigation-overlay__container');
   overlay.classList.add('overlay-container');

   elem.parentElement.after(overlay);

   const closeOverlay = () => {
      if (screenSizes.isTabletAndOver()) {
         overlay.style.opacity = "0";
         overlay.style.visibility = "hidden";
         overlay.style.transitionDelay = "0s, 0s";
         elem.classList.remove('cmp-navigation--shadow');
      }
   };

   const openOverlay = () => {
      if (screenSizes.isTabletAndOver()) {
         overlay.style.opacity = "0.5";
         overlay.style.visibility = "visible";
         overlay.style.transitionDelay = "0s, 0s";
         elem.classList.add('cmp-navigation--shadow');
      }
   };

   const handleClickAway = event => {
      if (!(event && event.target && event.target.classList)) { return; }

      const level1ClickableClassNames = ['cmp-navigation__container', 'cmp-navigation__item-link', 'left', 'inline-svg', 'st0'];

      const matches = level1ClickableClassNames.filter(className => event.target.classList.contains(className));

      if (matches.length === 0) {
         closeOverlay();

         event.stopPropagation();
      }
   }

   Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function(e){
      const level2Links = e.querySelector('.cmp-navigation__group');

      const level2LinksCount = (level2Links) ? level2Links.children.length : 0;

      if (level2LinksCount !== 0) {
         e.addEventListener('mouseover', openOverlay);
         e.addEventListener('mouseleave', closeOverlay);     
      }
      
      const level1Link = e.querySelector('.cmp-navigation__container .cmp-navigation__item-link');

      if (level1Link) {
         level1Link.addEventListener('click', event => event.preventDefault());
      }
   });

   document.body.addEventListener('click', handleClickAway);

   const header = document.querySelector('.cmp-header');

   if (header) {
      header.addEventListener('click', handleClickAway);
   }
}
