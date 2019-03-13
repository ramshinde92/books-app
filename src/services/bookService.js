import { BASE_URL } from "../constants";

const bookService = {
  async getCategories() {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const { categories } = await response.json();
      return categories;
    } catch (err) {
      throw new Error("Unable to fetch categories");
    }
  },

  async getAllBooks() {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      const { books } = await response.json();
      return books;
    } catch (err) {
      throw new Error("Unable to fetch all books");
    }
  },

  async getBook(bookId) {
    try {
      const response = await fetch(`${BASE_URL}/books/${bookId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("Unable to fetch book");
    }
  },

  async getActualBooks(bookIds) {
    try {
      const fetchBooks = bookIds.map(id => fetch(`${BASE_URL}/books/${id}`));
      const data = await Promise.all(fetchBooks);
      const arr = await Promise.all(data.map(el => el.json()));
      return arr;
    } catch (err) {
      throw new Error("Unable to fetch books by IDs");
    }
  },

  async getBooks(categoryId) {
    try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`);
      const { book_ids } = await response.json();
      return this.getActualBooks(book_ids);
    } catch (err) {
      throw new Error("Unable to fetch books");
    }
  }
};

export default bookService;
