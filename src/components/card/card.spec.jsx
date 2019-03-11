import React from "react";
import { shallow } from "enzyme";
import Card from "./card";

describe("Card Component", () => {
  it("should render card with correct props", () => {
    const component = shallow(
      <Card imgUrl="http://sampleImage.com" title="Duck" read={jest.fn()} />
    );

    expect(component.find("img").props()).toEqual({
      alt: "Duck",
      className: "img",
      src: "http://sampleImage.com"
    });

    expect(component.find(".title").props()).toEqual({
      className: "title",
      children: "Duck"
    });
  });

  it("should call read on click of button", () => {
    const read = jest.fn();
    const component = shallow(<Card read={read} />);

    const button = component.find("button");

    button.simulate("click");

    expect(read).toHaveBeenCalled();
  });

  it("should render with default props", () => {
    const read = jest.fn();
    const component = shallow(<Card read={read} />);

    expect(component.find("img").props()).toEqual({
      alt: "No Card",
      className: "img",
      src: "https://unsplash.com/photos/YM1z9tNvPp4"
    });

    expect(component.find(".title").props()).toEqual({
      className: "title",
      children: "No Card"
    });

    expect(component.find("button").props()).toEqual({
      children: "Read",
      onClick: read
    });
  });

  it("should not render button if read prop is not passed", () => {
    const component = shallow(<Card />);

    expect(component.find("button").exists()).toBeFalsy();
  });
});
