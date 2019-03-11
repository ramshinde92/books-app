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
  async getBooks(categoryId) {
    try {
      const response = await fetch(`${BASE_URL}/categories/${categoryId}`);
      const { book_ids } = await response.json();
      const fetchBooks = book_ids.map(id => fetch(`${BASE_URL}/books/${id}`));
      const data = await Promise.all(fetchBooks);
      const arr = await Promise.all(data.map(el => el.json()));
      return arr;
    } catch (err) {
      return [];
    }
  }
};

export default bookService;
