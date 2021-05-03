import React from "react";
import { shallow } from "enzyme";
import VisualGallery from "../VisualGallery";
const defaultConfig = {
  templates: [
    {
      src:
        "http://localhost:4502/content/dam/waters/en/brand-assets/product/covid19/banner-covid-innovation.jpg.{{width}}.resize/img.jpg",
      alt: "test",
      description: "test",
      title: "test",
    },
    {
      src:
        "http://localhost:4502/content/dam/waters/en/brand-assets/product/catalogs/catalog-2019-2020.jpg.{{width}}.resize/img.jpg",
      alt: "alt text",
      description: "Some description",
      title: "test",
    },
  ],
  widths: ["128", "450", "650", "789", "1280"],
  zoomInIcon:
    "http://localhost:4502/content/dam/waters/en/brand-assets/icons/zoom-in.svg",

  alt: "test",
  videoIds: ["1234566", "34343434"],
  tabs: ["Images", "Videos"],
  zoomLabel: "Tap or Click to Zoom",
  brightcoveAccount: "4324324324324",
  brightcovePlayerId: "3434234324324",
};

describe("<VisualGallery />", () => {
  let VisualGalleryComponent = "";
  beforeEach(() => {
    VisualGalleryComponent = shallow(<VisualGallery {...defaultConfig} />);
  });

  test("should render correctly", () => {
    expect(VisualGalleryComponent).toMatchSnapshot();
  });

  test("should render Image Gallery with no tabs", () => {
    const props = {
      templates: [
        {
          src:
            "http://localhost:4502/content/dam/waters/en/brand-assets/product/covid19/banner-covid-innovation.jpg.{{width}}.resize/img.jpg",
          alt: "test",
          description: "test",
          title: "test",
        },
      ],
      widths: ["128", "450", "650", "789", "1280"],
      zoomInIcon:
        "http://localhost:4502/content/dam/waters/en/brand-assets/icons/zoom-in.svg",

      alt: "test",
      videoIds: ["1234566", "34343434"],
      tabs: ["Images"],
      zoomLabel: "Tap or Click to Zoom",
      brightcoveAccount: "4324324324324",
      brightcovePlayerId: "3434234324324",
    };
    const wrapper = shallow(<VisualGallery {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
