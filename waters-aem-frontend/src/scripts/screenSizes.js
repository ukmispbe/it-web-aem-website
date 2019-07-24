const screenSizes = {
    isMobile: () => window.matchMedia('(max-width: 650px)').matches,
    isTabletAndUnder: () => window.matchMedia('(max-width: 1200px)').matches
}

export default screenSizes;