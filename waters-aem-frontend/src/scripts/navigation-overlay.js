let elem = document.querySelector('.cmp-navigation');

if (elem) {
   let overlay = document.createElement('div');
   overlay.classList.add('cmp-navigation-overlay__container');
   overlay.classList.add('overlay-container');
   elem.parentElement.after(overlay);

   Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function(e){
      e.addEventListener('mouseover', function() {
         overlay.style.visibility = "visible";
         elem.classList.add('cmp-navigation--shadow');
      });
      e.addEventListener('mouseleave', function() {
         overlay.style.visibility = "hidden";
         elem.classList.remove('cmp-navigation--shadow');
      });
   });

}
