const bannerReplacement = function() {

    if(!objectFitIsSupported()) {
        const bannerImages = Array.from(document.querySelectorAll('.cmp-banner .cmp-image'));

        console.dir(bannerImages);

        bannerImages.forEach(imageContainer => replaceBannerImage(imageContainer));
    }

    function replaceBannerImage(imageContainer) {
        imageContainer.classList.add('cmp-banner__backgroundImage');

        const imageElement = imageContainer.querySelector('.cmp-image__image');

        if(imageElement) {
            imageContainer.style.backgroundImage = `url('${imageElement.src}')`;
        }
    }

    function objectFitIsSupported() {
        return (Modernizr.objectfit) ? true : false;
    }
}

window.addEventListener('load', bannerReplacement);