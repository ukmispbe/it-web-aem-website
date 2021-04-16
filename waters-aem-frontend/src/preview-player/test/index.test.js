import React from "react";
import { shallow } from "enzyme";
import { PreviewPlayer } from "../index";
const defaultProps = {    
        imgSrc: '',
        widths: [],
        defaultImage: '',
        zoomIcon: '/#',
        zoomIconText: ''   
};

describe("<PreviewPlayer />", () => {
  let PreviewPlayerComponent = "";
  beforeEach(() => {
    PreviewPlayerComponent = shallow(<PreviewPlayer {...defaultProps} />);
  });

  test("should render correctly", () => {
    expect(PreviewPlayerComponent).toMatchSnapshot();
  });

  test("should render image with label", () => {
    const props = {
        imgSrc: 'http://localhost:4502/content/dam/waters/en/brand-assets/product/alliance-launch/alliance-online.jpg.{{width}}.resize/img.jpg',
        widths: ['1280','770','620','375','320','256','140','128'],
        defaultImage: 'http://localhost:4502/content/dam/waters/en/brand-assets/product/alliance-launch/alliance-online.jpg.770.resize/img.jpg',
        zoomIcon: '/',
        zoomIconText: 'Click or Tap to Zoom'
    };
    const wrapper = shallow(<PreviewPlayer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
});