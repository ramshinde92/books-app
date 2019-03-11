import React, { Component } from "react";
import bookService from "../../services/bookService";
import Card from "../card/card";
import styles from "./discover.module.css";

class Discover extends Component {
  state = {
    categories: [],
    books: []
  };

  componentDidMount() {
    bookService.getCategories().then(categories => {
      this.setState({ categories });
    });
  }

  getBooks(id) {
    bookService.getBooks(id).then(books => {
      this.setState({ books });
    });
  }

  render() {
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
                  <Card
                    title={el.title}
                    imgUrl={el.image_url}
                    read={() => this.read(el.id)}
                  />
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
