import { BASE_URL } from "../constants";

const bookService = {
  async getCategories() {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const { categories } = await response.json();
      return categories;
    } catch (err) {
      return [];
    }
  },

  async getAllBooks() {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      const { books } = await response.json();
      return books;
    } catch (err) {
      return [];
    }
  },

  async getActualBooks(bookIds) {
    //TODO: add error handling here
    const fetchBooks = bookIds.map(id => fetch(`${BASE_URL}/books/${id}`));
    const data = await Promise.all(fetchBooks);
    const arr = await Promise.all(data.map(el => el.json()));
    return arr;
  },

  async getBooks(categoryId) {
    try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`);
      const { book_ids } = await response.json();
      return this.getActualBooks(book_ids);
    } catch (err) {
      return [];
    }
  }
};

export default bookService;
