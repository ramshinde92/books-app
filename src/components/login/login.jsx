import React from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/authService";

const Login = props => {
  const login = async () => {
    const response = await authService.authenticate();

    if (response) {
      authService.setAuthenticated();
      props.authenticate();
    } else {
      authService.unset();
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login container">
      <div>
        <button className="primary-button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
