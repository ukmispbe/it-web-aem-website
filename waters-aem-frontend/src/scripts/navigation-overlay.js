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
      }
   }

   // Contains links only displayed on Mobile
   const mobileOnlyLinks = document.getElementById("cmp-navigation-mobileList");
   let mobileOnlyLinksJson = "";
   if (mobileOnlyLinks) {
      mobileOnlyLinksJson = JSON.parse(mobileOnlyLinks.innerHTML);
   }
   
   Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function(e){
      const level2Links = e.querySelector('.cmp-navigation__group');

      const level2LinksCount = (level2Links) ? level2Links.children.length : 0;

      if (level2Links && mobileOnlyLinksJson.mobileList) {
         if (mobileOnlyLinksJson.mobileList !== "[]") {
            // All Products, All Applications etc
            const allArrayLevel2Links = Array.from(level2Links.children);
               allArrayLevel2Links.map((li) => {
               const anchor = li.querySelector('.cmp-navigation__container > a')
               //const anchorBasePathName = anchor.pathname.substr(0, anchor.pathname.length - 5);
               if (mobileOnlyLinksJson.mobileList.includes(anchor.pathname)) {
                  li.classList.add("cmp-navigation__group-all-mobile")
               }
            });
         }
      }

      if (level2LinksCount !== 0) {
         e.addEventListener('mouseover', openOverlay);
         e.addEventListener('mouseleave', closeOverlay);     
      }
      
      const level1Link = e.querySelector('.cmp-navigation__container .cmp-navigation__item-link');

      if (level1Link) {
         if (screenSizes.isMobile()) {
            level1Link.addEventListener('click', event => event.preventDefault());
         }   
      }
   });

   document.body.addEventListener('click', handleClickAway);

   const header = document.querySelector('.cmp-header');

   if (header) {
      header.addEventListener('click', handleClickAway);
   }
}
