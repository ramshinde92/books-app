import React, { Component } from "react";
import authService from "../../services/authService";
import bookService from "../../services/bookService";
import style from "./book.module.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", isPremium: "" };
  }

  componentDidMount() {
    //TODO:write catch
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
      });
  }

  render() {
    const hasSubscription =
      this.state.isPremium === "premium" ? null : (
        <div className={style.buySubscription}>
          <button className="primary-button">Subscribe to read</button>
        </div>
      );

    return (
      <div className={`container container--block ${style.container}`}>
        <h2>{this.state.title}</h2>
        <p className="content">{this.state.content}</p>
        {hasSubscription}
      </div>
    );
  }
}

export default Book;
