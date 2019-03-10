import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const el = props.isAuthenticated ? (
    <Link to="/">Discover</Link>
  ) : (
    <Link to="/login">Login</Link>
  );

  return (
    <div className="header">
      <div className="container">
        <img className="logo" src="logo.webp" />
        {el}
      </div>
    </div>
  );
};

export default Header;
