import React from "react";
import { shallow } from "enzyme";
import Thumbnail from "../Thumbnail";
const defaultConfig = {
  thumbnailURL: "",
  thumbnailAltText: "",
  thumbnailTitleText: "",
  thumbnailLabel: "",
  isVideo: false,
  showVideoPlayButton: true,
  timeStamp: "",
  videoIconURL: "",
  className: "",
  thumbnailLabelClassName: "",
  handleThumbnailMouseLeave: () => {},
  handleThumbnailMouseOver: () => {},
  handleThumbnailMouseOver: () => {},
  handleThumbnailKeyUp: () => {},
  onThumbnailClick: () => {},
  handleThumbnailError: () => {},
};

describe("<Thumbnail />", () => {
  let ThumbnailComponent = "";
  beforeEach(() => {
    ThumbnailComponent = shallow(<Thumbnail {...defaultConfig} />);
  });

  test("should render correctly", () => {
    expect(ThumbnailComponent).toMatchSnapshot();
  });

  test("should render image without label", () => {
    const props = {
      thumbnailURL:
        "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
      thumbnailAltText: "productImage",
      thumbnailTitleText: "Innovation Acquity",
      className: "thumbnail-active",
    };
    const wrapper = shallow(<Thumbnail {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("should render image with label", () => {
    const props = {
      thumbnailURL:
        "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
      thumbnailAltText: "productImage",
      thumbnailTitleText: "Innovation Acquity",
      thumbnailLabel: "Innovation Acquity RDA Smart MS",
    };
    const wrapper = shallow(<Thumbnail {...props} />);

    expect(wrapper.find(".thumbnail-title").text()).toBe(
      "Innovation Acquity RDA Smart MS"
    );
  });

  test("should render image with video play icon", () => {
    const props = {
      thumbnailURL:
        "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
      thumbnailAltText: "productImage",
      isVideo: true,
      videoIconURL:
        "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/play.svg",
    };
    const wrapper = shallow(<Thumbnail {...props} />);

    expect(wrapper.find("ReactSVG")).toHaveLength(1);
  });

  test("should render image with time stamp", () => {
    const props = {
      thumbnailURL:
        "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
      thumbnailAltText: "productImage",
      isVideo: true,
      showVideoPlayButton: false,
      timeStamp: "02:34",
      videoIconURL:
        "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/play.svg",
    };
    const wrapper = shallow(<Thumbnail {...props} />);
    expect(wrapper.find("ReactSVG")).toHaveLength(0);
    expect(wrapper.find(".thumbnail-time-stamp-text").text()).toBe("02:34");
  });
});
