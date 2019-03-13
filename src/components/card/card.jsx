import React from "react";
import PropTypes from "prop-types";
import style from "./card.module.css";

const Card = props => {
  const { id, title, imgUrl } = props;
  const { card, img, title: cssForTitle, cardCTA } = style;

  return (
    <div className={card}>
      <p>
        <img className={img} src={imgUrl} alt={title} />
      </p>
      <p className={cssForTitle}>{title}</p>
      <p>
        <a className={cardCTA} href={`read/${id}`}>
          Read
        </a>
      </p>
    </div>
  );
};

Card.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string.isRequired
};

Card.defaultProps = {
  imgUrl: "https://unsplash.com/photos/YM1z9tNvPp4",
  title: "No Card"
};

export default Card;
