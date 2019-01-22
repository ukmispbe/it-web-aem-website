var  anchorList = document.querySelector('.cmp-anchor__list');

function anchorSticky() {
var  anchor = document.querySelector(".cmp-anchor");
anchorListItems = document.querySelector(".cmp-anchor__list");
screenTop = document.querySelector('.cmp-anchor').getBoundingClientRect().top;
if( document.documentElement.scrollTop  > screenTop ) {
    anchor.addClass('sticky');
    anchorListItems.addClass('cmp-anchor-hide');
  } else {
    anchor.removeClass('sticky');
    anchorListItems.removeClass('cmp-anchor-hide');
  }
}

function toggleMobileNav(){
alert();
if(anchorList.classList.contains('cmp-anchor-hide')){
    anchorList.classList.add('cmp-anchor-show');
    anchorList.classList.remove('cmp-anchor-hide');
}
else{
    anchorList.classList.add('cmp-anchor-hide');
    anchorList.classList.remove('cmp-anchor-show');
    }
//element.classList.contains("highlighted")
}

window.addEventListener('scroll', anchorSticky)
anchorList.addEventListener('click', () => {
    toggleMobileNav()
})