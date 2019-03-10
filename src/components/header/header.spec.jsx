import React from "react";
import { shallow } from "enzyme";
import Header from "./header";
import { Link } from "react-router-dom";

describe("Header Component", () => {
  it("should render header with logo and login link", () => {
    const component = shallow(<Header isAuthenticated={false} />);

    const container = component.find(".container");

    expect(container.find("img").props()).toEqual({
      className: "logo",
      src: "logo.webp"
    });

    expect(container.find(Link).getElement().props).toEqual({
      to: "/login",
      children: "Login",
      replace: false
    });
  });

  it("should render header with logo and discover link", () => {
    const component = shallow(<Header isAuthenticated={true} />);

    const container = component.find(".container");

    expect(container.find("img").props()).toEqual({
      className: "logo",
      src: "logo.webp"
    });

    expect(container.find(Link).getElement().props).toEqual({
      to: "/",
      children: "Discover",
      replace: false
    });
  });
});
