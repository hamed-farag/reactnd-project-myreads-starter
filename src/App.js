import React from "react";
import { Switch, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'

import Home from "./containers/Home";
import Search from "./containers/Search";
import NotFound from "./containers/NotFound";

import "./App.css";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/search" render={() => <Search />} />
          <Route render={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
