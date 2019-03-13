import React from "react";
import { mount } from "enzyme";
import bookService from "../../services/bookService";
import authService from "../../services/authService";
import Book from "./book";

describe("Book Component", () => {
  const match = { params: { id: 1 } };
  const bookResponse = { id: 1, title: "Book 1", content: "test content" };
  describe("free subscription", () => {
    const subscriptionResponse = { access_type: "free" };
    let subscriptionSpy, bookServiceSpy;

    beforeEach(() => {
      subscriptionSpy = jest
        .spyOn(authService, "subscription")
        .mockImplementation(() => Promise.resolve(subscriptionResponse));

      bookServiceSpy = jest
        .spyOn(bookService, "getBook")
        .mockImplementation(() => Promise.resolve(bookResponse));
    });

    afterEach(() => {
      subscriptionSpy.mockRestore();
      bookServiceSpy.mockRestore();
    });

    it("should fetch subscription information and book information on didMount", async () => {
      const component = await mount(<Book match={match} />);

      process.nextTick(() => {
        expect(component.instance().state).toEqual({
          title: "Book 1",
          content: "test content",
          isPremium: "free",
          error: ""
        });
      });
    });

    it("should assign title and content", async () => {
      const component = await mount(<Book match={match} />);

      process.nextTick(() => {
        component.update();
        expect(component.find("h2").text()).toEqual("Book 1");
        expect(component.find(".content").text()).toEqual("test content");
      });
    });

    it("should show buy subscription dom", async () => {
      const component = await mount(<Book match={match} />);

      process.nextTick(() => {
        component.update();
        expect(component.find(".buySubscription").exists()).toBeTruthy();
        expect(component.find(".primary-button").props()).toEqual({
          children: "Subscribe to read",
          className: "primary-button"
        });
      });
    });
  });

  describe("premium subscription", () => {
    it("should not show button asking for subscription", async done => {
      const subscriptionSpy = jest
        .spyOn(authService, "subscription")
        .mockImplementation(() => Promise.resolve({ access_type: "premium" }));

      const bookServiceSpy = jest
        .spyOn(bookService, "getBook")
        .mockImplementation(() => Promise.resolve(bookResponse));

      const component = await mount(<Book match={match} />);

      process.nextTick(() => {
        component.update();
        expect(component.find(".buySubscription").exists()).toBeFalsy();
        subscriptionSpy.mockRestore();
        bookServiceSpy.mockRestore();
        done();
      });
    });
  });

  it("should render with error message if bookService fails", async done => {
    const bookServiceSpy = jest
      .spyOn(bookService, "getBook")
      .mockImplementation(() => Promise.reject({ message: "Unable to fetch" }));

    const subscriptionSpy = jest
      .spyOn(authService, "subscription")
      .mockImplementation(() => Promise.resolve({ access_type: "premium" }));

    const component = await mount(<Book match={match} />);

    process.nextTick(() => {
      component.update();
      expect(component.find("p.container").text()).toEqual("Unable to fetch");
      subscriptionSpy.mockRestore();
      bookServiceSpy.mockRestore();
      done();
    });
  });

  it("should render with error message if authService fails", async done => {
    const bookServiceSpy = jest
      .spyOn(bookService, "getBook")
      .mockImplementation(() => Promise.resolve(bookResponse));

    const subscriptionSpy = jest
      .spyOn(authService, "subscription")
      .mockImplementation(() =>
        Promise.reject({ message: "Unable to get subscription" })
      );

    const component = await mount(<Book match={match} />);

    process.nextTick(() => {
      component.update();
      expect(component.find("p.container").text()).toEqual(
        "Unable to get subscription"
      );
      subscriptionSpy.mockRestore();
      bookServiceSpy.mockRestore();
      done();
    });
  });
});
