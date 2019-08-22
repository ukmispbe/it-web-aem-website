let anchorSkuScroll = function() {
   let handler = function(event) {
      if (document.getElementsByClassName('cmp-sku-details__wrapper').length) {
         if (document.getElementsByClassName('cmp-anchor--sticky').length && document.getElementsByClassName('cmp-sku-details--sticky').length) {
            document.getElementsByClassName('cmp-sku-details__wrapper')[0].classList.add('cmp-sku-details__wrapper-noBorder');
         } else {
            document.getElementsByClassName('cmp-sku-details__wrapper')[0].classList.remove('cmp-sku-details__wrapper-noBorder');
         }
      }else{
         window.removeEventListener('scroll', handler);
      }
   }

   return handler;
}

window.addEventListener('scroll', anchorSkuScroll());
