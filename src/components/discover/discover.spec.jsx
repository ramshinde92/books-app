import React from "react";
import { shallow, mount } from "enzyme";
import Discover from "./discover";
import bookService from "../../services/bookService";

describe("Discover Component", () => {
  describe("On Mount", () => {
    let categorySpy, booksSpy, promiseAllSpy;

    const categoryResponse = [{ id: "1", title: "Productivity" }];
    const booksResponse = [{ id: "1", title: "Book 1" }];
    const promiseAllResponse = Promise.resolve([
      categoryResponse,
      booksResponse
    ]);

    beforeEach(() => {
      categorySpy = jest
        .spyOn(bookService, "getCategories")
        .mockImplementation(() => categoryResponse);

      booksSpy = jest
        .spyOn(bookService, "getBooks")
        .mockImplementation(() => booksResponse);

      promiseAllSpy = jest
        .spyOn(Promise, "all")
        .mockImplementation(() => promiseAllResponse);
    });

    afterEach(() => {
      categorySpy.mockRestore();
      booksSpy.mockRestore();
      promiseAllSpy.mockRestore();
    });

    it("should fetch books and categories on mount", async () => {
      const component = await mount(<Discover />);

      expect(component.instance().state).toEqual({
        books: booksResponse,
        categories: categoryResponse,
        error: ""
      });
    });

    it("should map state category to sidebar", async () => {
      const component = await mount(<Discover />);

      component.update();

      const sideBar = component.find(".sideBar");
      const li = sideBar
        .find("ul")
        .at(0)
        .children();
      const link = li.children();

      expect(li.prop("className")).toEqual("sideBarListItem");
      expect(link.prop("className")).toEqual("link");
      expect(link.prop("children")).toEqual("Productivity");
      expect(link.prop("href")).toEqual("/");
    });

    it("should map state category to cards list", async () => {
      const component = await mount(<Discover />);

      component.update();

      const cardsList = component.find(".cardsList");
      const li = cardsList
        .find("ul")
        .at(0)
        .children();
      const card = li.children();

      expect(card.prop("title")).toEqual("Book 1");
      expect(card.prop("imgUrl")).toEqual(
        "https://unsplash.com/photos/YM1z9tNvPp4"
      );
    });

    it("should display error message if any of the service gives error", async () => {
      promiseAllSpy = jest
        .spyOn(Promise, "all")
        .mockImplementation(() => Promise.reject({ message: "failed" }));

      const component = await mount(<Discover />);

      process.nextTick(() => {
        component.update();
        expect(component.find("p.container").text()).toEqual("failed");
      });
    });
  });

  it("should fetch books on click of category", async () => {
    const categories = [{ id: 1, title: "Productivity" }];
    const books = [{ id: "1", title: "Book 1" }];
    const newBooks = [
      { id: "1", title: "Book 1" },
      { id: "2", title: "Book 2" }
    ];

    const spy = jest
      .spyOn(bookService, "getBooks")
      .mockImplementation(() => Promise.resolve(newBooks));

    const component = mount(<Discover />);

    component.setState({
      books,
      categories
    });

    component.find(".link").simulate("click", {
      preventDefault: () => {}
    });

    await component.update();

    expect(component.instance().state.books).toEqual(newBooks);

    spy.mockRestore();
  });

  it("should display error if api fails on click of category", async () => {
    const categories = [{ id: 1, title: "Productivity" }];

    const spy = jest
      .spyOn(bookService, "getBooks")
      .mockImplementation(() =>
        Promise.reject({ message: "Failed to fetch book" })
      );

    const component = mount(<Discover />);

    component.setState({
      categories
    });

    await component.update();

    component.find(".link").simulate("click", {
      preventDefault: () => {}
    });

    process.nextTick(() => {
      component.update();
      expect(component.find("p.container").text()).toEqual(
        "Failed to fetch book"
      );
      spy.mockRestore();
    });
  });
});
