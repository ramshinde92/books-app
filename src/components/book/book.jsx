import React, { Component, Fragment } from "react";
import authService from "../../services/authService";
import bookService from "../../services/bookService";
import style from "./book.module.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", isPremium: "", error: "" };
  }

  componentDidMount() {
    this.fetchBook();
  }

  fetchBook() {
    let isPremium;
    authService
      .subscription()
      .then(data => {
        isPremium = data.access_type;
        return bookService.getBook(this.props.match.params.id);
      })
      .then(data => {
        const { title, content } = data;
        this.setState({
          title,
          content,
          isPremium
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { error, content, title, isPremium } = this.state;

    const hasSubscription =
      isPremium === "premium" ? null : (
        <div className={style.buySubscription}>
          <button className="primary-button">Subscribe to read</button>
        </div>
      );

    const errorEl = (
      <Fragment>
        <p className="container error">{error}</p>
      </Fragment>
    );

    const el = (
      <div className={`container container--block ${style.container}`}>
        <h2>{title}</h2>
        <p className="content">{content}</p>
        {hasSubscription}
      </div>
    );

    if (error) {
      return errorEl;
    } else {
      return el;
    }
  }
}

export default Book;
