const bookService = {
  getBooks(cb) {
    fetch("https://ancient-springs-73658.herokuapp.com/categories")
      .then(res => res.json())
      .then(data => {
        cb(data.categories);
      });
  }
};

export default bookService;
