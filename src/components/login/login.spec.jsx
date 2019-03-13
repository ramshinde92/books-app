import React from "react";
import { shallow, mount } from "enzyme";
import { Redirect } from "react-router-dom";
import Login from "./login";
import authService from "../../services/authService";

describe("Login Component", () => {
  it("should render with Login", () => {
    const component = shallow(
      <Login isAuthenticated={false} authenticate={jest.fn()} />
    );
    const login = component.find(".login");

    expect(login.hasClass("container")).toBeTruthy();
    expect(login.find("button").text()).toEqual("Login");
  });

  it("should render with Redirect", () => {
    const component = shallow(
      <Login isAuthenticated={true} authenticate={jest.fn()} />
    );

    expect(component.find(Redirect).exists()).toEqual(true);
    expect(component.find(Redirect).props()).toEqual({ to: "/", push: false });
  });

  it("should authenticate on click of login button ", () => {
    const component = mount(
      <Login isAuthenticated={false} authenticate={jest.fn()} />
    );
    const loginBtn = component.find("button");

    const mockFetchPromise = Promise.resolve(true);
    jest
      .spyOn(authService, "authenticate")
      .mockImplementation(() => mockFetchPromise);

    jest.spyOn(authService, "setAuthenticated");

    loginBtn.simulate("click");

    expect(authService.authenticate).toHaveBeenCalled();
    setTimeout(() => {
      expect(authService.setAuthenticated).toHaveBeenCalled();
      expect(component.prop("authenticate")).toHaveBeenCalled();
    });
  });

  it("should not authenticate on click of login button ", () => {
    const component = mount(
      <Login isAuthenticated={false} authenticate={jest.fn()} />
    );
    const loginBtn = component.find("button");

    const mockFetchPromise = Promise.resolve(false);
    jest
      .spyOn(authService, "authenticate")
      .mockImplementation(() => mockFetchPromise);

    jest.spyOn(authService, "unset");

    loginBtn.simulate("click");

    expect(authService.authenticate).toHaveBeenCalled();
    setTimeout(() => {
      expect(authService.unset).toHaveBeenCalled();
    });
  });
});
