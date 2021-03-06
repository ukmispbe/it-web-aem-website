import React from "react";
import { shallow } from "enzyme";
import  OverlayWithTabs from "../OverlayWithTabs";
const defaultConfig = {
  tabs:[{ name: "Product Images" }, { name: "Video" }, { name: "Test" }], 
  children: '<div>data</div>', 
  isOpen : true
};

describe("<OverlayWithTabs />", () => {
  let OverlayWithTabsComponent = "";
  beforeEach(() => {
    OverlayWithTabsComponent = shallow(<OverlayWithTabs {...defaultConfig} />);
  });

  test("should render correctly", () => {
    expect(OverlayWithTabsComponent).toMatchSnapshot();
  });

  test("should render component without tabs", () => {
    const props = {
      tabs:[], 
      children: '', 
      isOpen : false
    };
    const wrapper = shallow(<OverlayWithTabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
});
