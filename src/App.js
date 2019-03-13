import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Discover from "./components/discover/discover";
import PrivateRoute from "./components/privateRoute/privateRoute";
import Book from "./components/book/book";
import authService from "./services/authService";
// css imports
import "./app.css";

class App extends Component {
  state = {
    isAuthenticated: authService.get()
  };

  authenticate = () => {
    this.setState({
      isAuthenticated: authService.get()
    });
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <div>
          <Header isAuthenticated={isAuthenticated} />
          <Route
            path="/login"
            exact
            component={() => (
              <Login
                authenticate={this.authenticate}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/"
            exact
            component={Discover}
          />

          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/read/:id"
            exact
            component={Book}
          />
        </div>
      </Router>
    );
  }
}

export default App;
