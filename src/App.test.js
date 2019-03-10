import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import authService from "./services/authService";
import Header from "./components/header/header";

describe("App Component", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should call authenticate and update state", () => {
    const app = shallow(<App />);
    jest.spyOn(authService, "get").mockImplementation(() => true);
    app.instance().authenticate();
    expect(app.instance().state).toEqual({ isAuthenticated: true });
    expect(app.find(Header).props()).toEqual({ isAuthenticated: true });
  });
});
