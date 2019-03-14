import React, { Component } from "react";
import bookService from "../../services/bookService";
import Card from "../card/card";
import styles from "./discover.module.css";

class Discover extends Component {
  state = {
    categories: [],
    books: [],
    error: ""
  };

  componentDidMount() {
    const categories = bookService.getCategories();
    const books = bookService.getAllBooks();

    const getAll = Promise.all([categories, books]);

    getAll
      .then(([categories, books]) => {
        this.setState({
          categories,
          books
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  getBooks(id) {
    bookService
      .getBooks(id)
      .then(books => {
        this.setState({ books });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    if (this.state.error) {
      return <p className="container error">{this.state.error}</p>;
    }

    return (
      <div className={`${styles.container} container `}>
        <div className={styles.sideBar}>
          <ul>
            {this.state.categories.map(el => {
              return (
                <li className={styles.sideBarListItem} key={el.id}>
                  <a
                    className={styles.link}
                    href="/"
                    onClick={e => {
                      e.preventDefault();
                      this.getBooks(el.id);
                    }}
                  >
                    {el.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.cardsWrapper}>
          <ul className={styles.cardsList}>
            {this.state.books.map(el => {
              return (
                <li key={el.id}>
                  <Card title={el.title} imgUrl={el.image_url} id={el.id} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Discover;
