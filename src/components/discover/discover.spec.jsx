import React from "react";
import { shallow, mount } from "enzyme";
import Discover from "./discover";
import bookService from "../../services/bookService";

describe("Discover Component", () => {
  describe("On Mount", () => {
    let categorySpy, booksSpy, promiseAllSpy;

    const categoryResponse = [{ id: 1, title: "Productivity" }];
    const booksResponse = [{ id: 1, title: "Book 1" }];
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
        categories: categoryResponse
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
  });

  it("should fetch books on click of category", async () => {
    const categories = [{ id: 1, title: "Productivity" }];
    const books = [{ id: 1, title: "Book 1" }];
    const newBooks = [{ id: 1, title: "Book 1" }, { id: 2, title: "Book 2" }];

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
});
