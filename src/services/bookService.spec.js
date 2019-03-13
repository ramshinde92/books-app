import bookService from "./bookService";

describe("Book Service", () => {
  let spy;
  const rejectedPromiseFn = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject();
    });
  });
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
    const response = await bookService.getCategories([1, 2]);

    expect(response).toEqual([{ id: 1, category: "Productivity" }]);
  });

  it("should not fetch categories", async () => {
    global.fetch = rejectedPromiseFn;

    expect.assertions(1);
    try {
      await bookService.getCategories();
    } catch (err) {
      expect(err.message).toEqual("Unable to fetch categories");
    }
  });

  it("should not fetch book IDs", async () => {
    global.fetch = rejectedPromiseFn;

    expect.assertions(1);
    try {
      await bookService.getBooks(123);
    } catch (err) {
      expect(err.message).toEqual("Unable to fetch books");
    }
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

    const response = await bookService.getBooks(123);

    expect(response).toEqual(mockSuccessResponse);
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
    const response = await bookService.getActualBooks([1, 2]);
    expect(response).toEqual([
      { title: "Hello World" },
      { title: "Hello World" }
    ]);
  });

  it("should not fetch books by IDs", async () => {
    global.fetch = rejectedPromiseFn;

    expect.assertions(1);
    try {
      await bookService.getActualBooks();
    } catch (err) {
      expect(err.message).toEqual("Unable to fetch books by IDs");
    }
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
    const response = await bookService.getAllBooks();
    expect(response).toEqual(books);
  });

  it("should not fetch all books", async () => {
    global.fetch = rejectedPromiseFn;

    expect.assertions(1);
    try {
      await bookService.getAllBooks();
    } catch (err) {
      expect(err.message).toEqual("Unable to fetch all books");
    }
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

  it("should not fetch book", async () => {
    global.fetch = rejectedPromiseFn;

    expect.assertions(1);
    try {
      await bookService.getBook();
    } catch (err) {
      expect(err.message).toMatch("Unable to fetch book");
    }
  });
});
