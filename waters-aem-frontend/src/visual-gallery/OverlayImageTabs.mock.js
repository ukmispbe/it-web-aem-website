export const props = {
  templates: [
    {
      src:
        "http://localhost:4502/content/dam/waters/en/brand-assets/product/covid19/banner-covid-innovation.jpg.{{width}}.resize/img.jpg",
      alt: "test",
      description:
        "User should be able to pinch to zoom on the image only. Once the user starts to zoom",
      title: "test",
    },
    {
      src:
        "http://localhost:4502/content/dam/waters/en/brand-assets/product/catalogs/catalog-2019-2020.jpg.{{width}}.resize/img.jpg",
      alt: "alt text",
      description:
        "User should be able to pinch to zoom on the image only. Once the user starts to zoom, the Pinch to Zoom text and icon should disappear.",
      title: "test",
    },
  ],
  widths: ["128", "450", "650", "789", "1280"],
  zoomInIcon:
    "http://localhost:4502/content/dam/waters/en/brand-assets/icons/zoom-in.svg",
  alt: "test",
  videoIds: ["6084160447001", "5116024345001"],
  tabs: ["Images", "Videos"],
  zoomLabel: "Tap or Click to Zoom",
  brightcoveAccount: "1786731335",
  brightcovePlayerId: "ptF88s0lh8",
};

export const singleImageAndNoTabs = {
  templates: [
    {
      src:
        "http://localhost:4502/content/dam/waters/en/brand-assets/product/covid19/banner-covid-innovation.jpg.{{width}}.resize/img.jpg",
      alt: "test",
      description:
        "User should be able to pinch to zoom on the image only. Once the user starts to zoom.",
      title: "test",
    },
  ],
  widths: ["128", "450", "650", "789", "1280"],
  zoomInIcon:
    "http://localhost:4502/content/dam/waters/en/brand-assets/icons/zoom-in.svg",
  policyKey:
    "BCpkADawqM1m4GlNVBRuTcFVuPHqTd9akMFA2rJYhSPtDkhMSoSDRWNhOo3q5Wfquy9vooPMzTtjpR7RIzTyVpHa_a0YcXeFJWDnmau52-25MOFcM6s_rRWB-kY",
  brightCoveApi:
    "https://edge.api.brightcove.com/playback/v1/accounts/{accountId}/videos/{videoId}",
  alt: "test",
  videoIds: ["6084160447001", "5116024345001"],
  tabs: ["Images"],
  zoomLabel: "Tap or Click to Zoom",
  brightcoveAccount: "1786731335",
  brightcovePlayerId: "ptF88s0lh8",
};
export const visualGalleryMobileOverlayData = {
  templates: [
    {
      src:
        "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
      alt: "test",
      description:
        "User should be able to pinch to zoom on the image only. Once the user starts to zoom.",
      title: "test",
    },
    {
      src:
        "http://localhost:4502/content/dam/waters/emails/innovations-acquity-premier-column-logo.jpeg",
      alt: "test",
      description:
        "User should be able to pinch to zoom on the image only. Once the user starts to zoom.",
      title: "test title 2",
    },
  ],
  widths: ["128", "450", "650", "789", "1280"],
  zoomInIcon:
    "http://dev1.waters.com/content/dam/waters/en/brand-assets/icons/zoom-in.svg",
  alt: "test",
  videoIds: ["6084160447001", "5116024345001"],
  tabs: ["Images", "Videos"],
  zoomLabel: "Tap or Click to Zoom",
  brightcoveAccount: "1786731335",
  brightcovePlayerId: "ptF88s0lh8",
  pinchLabel: "Tap or Click to Zoom",
};
