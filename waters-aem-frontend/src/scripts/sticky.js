function handleSticky(targetClass, stickyClass) {
    const sourceClass = document.querySelector("."+targetClass);
    if (sourceClass){
        const sourceTop = sourceClass.offsetTop;
            if (window.scrollY > sourceTop) {
                sourceClass.classList.add(stickyClass);
            } else {
                sourceClass.classList.remove(stickyClass);
            }
    }
}

//inputs to this function are the targetClass and StickyClass
window.addEventListener('scroll', () => {
    handleSticky('btn-show-sort-filter', 'btn-show-sort-filter--sticky');
});