import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Redirect, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Discover from "../discover";

describe("Private Route", () => {
  it("should render Discover in Route if user is authenticated", () => {
    const context = {};
    const route = mount(
      <StaticRouter context={context}>
        <PrivateRoute isAuthenticated={true} component={Discover} />
      </StaticRouter>
    );
    expect(route.find(Discover).length).toEqual(1);
  });

  it("should render redirect in Route if user is not authenticated", () => {
    const context = {};
    const route = mount(
      <StaticRouter context={context}>
        <PrivateRoute isAuthenticated={false} component={Discover} />
      </StaticRouter>
    );
    expect(route.find(Redirect).length).toEqual(1);
  });
});
