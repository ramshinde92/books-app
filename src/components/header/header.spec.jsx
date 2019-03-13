import React from "react";
import { shallow } from "enzyme";
import Header from "./header";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

describe("Header Component", () => {
  it("should render header with logo and login link", () => {
    const component = shallow(<Header isAuthenticated={false} />);

    const container = component.find(".container");

    expect(container.find("img").props()).toEqual({
      alt: "blinkist logo",
      className: "logo",
      src: "../logo.webp"
    });

    expect(container.find(Link).getElement().props).toEqual({
      to: "/login",
      children: "Login",
      className: "link",
      replace: false
    });
  });

  it("should render header with logo, logout and discover link", () => {
    const component = shallow(<Header isAuthenticated={true} />);

    const container = component.find(".container");

    expect(container.find("img.logo").props()).toEqual({
      alt: "blinkist logo",
      className: "logo",
      src: "../logo.webp"
    });

    expect(container.find("img.logout").props()).toEqual({
      alt: "logout",
      className: "logout",
      src: "../logout.png",
      onClick: expect.any(Function)
    });

    expect(container.find(Link).getElement().props).toEqual({
      to: "/",
      children: "Discover Books",
      className: "link",
      replace: false
    });
  });

  it("should logout", () => {
    const component = shallow(<Header isAuthenticated={true} />);

    const logout = component.find("img.logout");

    global.location = {
      href: ""
    };

    authService.unset = jest.fn();

    logout.simulate("click");

    expect(authService.unset).toHaveBeenCalled();
    expect(window.location.href).toEqual("http://localhost/");
  });
});
