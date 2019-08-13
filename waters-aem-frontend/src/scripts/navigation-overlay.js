import screenSizes from '../scripts/screenSizes';

let elem = document.querySelector('.cmp-navigation');

if (elem) {
   let overlay = document.createElement('div');
   overlay.classList.add('cmp-navigation-overlay__container');
   overlay.classList.add('overlay-container');

   elem.parentElement.after(overlay);

   Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function(e){
      e.addEventListener('mouseover', function() {
         if (screenSizes.isTabletAndOver()) { 
            overlay.style.opacity = "0.5";
            overlay.style.visibility = "visible";
            overlay.style.transitionDelay = "0s, 0s";
            elem.classList.add('cmp-navigation--shadow');
         }
      });
      e.addEventListener('mouseleave', function() {
         if (screenSizes.isTabletAndOver()) { 
            overlay.style.opacity = "0";
            overlay.style.visibility = "hidden";
            overlay.style.transitionDelay = "0s, 0s";
            elem.classList.remove('cmp-navigation--shadow');
         }
      });
   });

}
