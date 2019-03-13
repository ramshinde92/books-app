import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = props => {
  const el = props.isAuthenticated ? (
    <Link className={styles.link} to="/">
      Discover Books
    </Link>
  ) : (
    <Link className={styles.link} to="/login">
      Login
    </Link>
  );

  return (
    <div className="header">
      <div className={`container ${styles.container}`}>
        <img className="logo" alt="blinkist logo" src="logo.webp" />
        {el}
      </div>
    </div>
  );
};

export default Header;
