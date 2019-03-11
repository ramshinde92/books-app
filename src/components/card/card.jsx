import React from "react";
import style from "./Card.module.css";
import PropTypes from "prop-types";

const Card = props => {
  return (
    <div className={style.card}>
      <p>
        <img className={style.img} src={props.imgUrl} alt={props.title} />
      </p>
      <p className={style.title}>{props.title}</p>
      {props.read ? (
        <p>
          <button onClick={props.read}>Read</button>
        </p>
      ) : null}
    </div>
  );
};

Card.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  read: PropTypes.func
};

Card.defaultProps = {
  imgUrl: "https://unsplash.com/photos/YM1z9tNvPp4",
  title: "No Card"
};

export default Card;
