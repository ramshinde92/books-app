import bookService from "./bookService";

describe("Book Service", () => {
  let spy;
  afterEach(() => {
    global.fetch.mockClear();
  });

  it("should get Categories", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({
              categories: [{ id: 1, category: "Productivity" }]
            });
          }
        });
      });
    });
    expect.assertions(1);
    const res = await bookService.getCategories([1, 2]);

    expect(res).toEqual([{ id: 1, category: "Productivity" }]);
  });

  it("should fetch book IDs", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({ book_ids: [1, 2] });
          }
        });
      });
    });

    const mockSuccessResponse = [
      { id: 1, title: "Book 1" },
      { id: 2, title: "Book 2" }
    ];
    const mockFetchResponse = Promise.resolve(mockSuccessResponse);
    spy = jest
      .spyOn(bookService, "getActualBooks")
      .mockImplementation(() => mockFetchResponse);

    const res = await bookService.getBooks(123);

    expect(res).toEqual(mockSuccessResponse);
    spy.mockRestore();
  });

  it("should fetch books with book IDs", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({ title: "Hello World" });
          }
        });
      });
    });

    expect.assertions(1);
    const res = await bookService.getActualBooks([1, 2]);
    expect(res).toEqual([{ title: "Hello World" }, { title: "Hello World" }]);
  });

  it("should fetch all books", async () => {
    const books = [
      {
        id: 1,
        title: "book1"
      },
      {
        id: 2,
        title: "book2"
      }
    ];

    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({ books });
          }
        });
      });
    });

    expect.assertions(1);
    //TODO:rename res
    const res = await bookService.getAllBooks();
    expect(res).toEqual(books);
  });

  it("should fetch book by ID", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return Promise.resolve({
              id: 1,
              title: "book1"
            });
          }
        });
      });
    });

    expect.assertions(1);

    const response = await bookService.getBook();
    expect(response).toEqual({
      id: 1,
      title: "book1"
    });
  });
});
