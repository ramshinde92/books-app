import React from "react";
import { shallow } from "enzyme";
import Card from "./card";

describe("Card Component", () => {
  it("should render card with correct props", () => {
    const component = shallow(
      <Card id={"1"} imgUrl="http://sampleImage.com" title="Duck" />
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

  it("should render with default props", () => {
    const component = shallow(<Card id={"1"} />);

    expect(component.find("img").props()).toEqual({
      alt: "No Card",
      className: "img",
      src: "https://unsplash.com/photos/YM1z9tNvPp4"
    });

    expect(component.find(".title").props()).toEqual({
      className: "title",
      children: "No Card"
    });

    expect(component.find(".cardCTA").props()).toEqual({
      className: "cardCTA",
      href: "read/1",
      children: "Read"
    });
  });
});
