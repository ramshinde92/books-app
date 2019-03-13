import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import authService from "../../services/authService";

const Header = props => {
  const logout = () => {
    authService.unset();
    window.location.href = "/";
  };

  const el = props.isAuthenticated ? (
    <div>
      <Link className={styles.link} to="/">
        Discover Books
      </Link>
      <img
        className={styles.logout}
        onClick={logout}
        src="../logout.png"
        alt="logout"
      />
    </div>
  ) : (
    <Link className={styles.link} to="/login">
      Login
    </Link>
  );

  return (
    <div className="header">
      <div className={`container ${styles.container}`}>
        <img className="logo" alt="blinkist logo" src="../logo.webp" />
        {el}
      </div>
    </div>
  );
};

export default Header;
