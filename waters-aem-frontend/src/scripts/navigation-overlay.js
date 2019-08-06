let elem = document.querySelector('.cmp-navigation');

if (elem) {
   let overlay = document.createElement('div');
   overlay.classList.add('cmp-navigation-overlay__container');
   overlay.classList.add('overlay-container');

   // Polyfill for IE11
   if (!elem.parentElement.after) {
      let parent = elem.parentElement;
      let grandparent = parent.parentElement;
      if (parent !== null && grandparent !== null) {
         if (overlay instanceof Node) {
            parent=parent.nextSibling;
            if (parent !== null) {
               grandparent.insertBefore(overlay,parent);
            } else {
               grandparent.appendChild(overlay);
            }
         }
      }
   } else {
      elem.parentElement.after(overlay);
   }

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
