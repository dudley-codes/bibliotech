import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import BookAdd from "./book/BookAdd";
import BookList from "./book/BookList";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          { isLoggedIn ? <BookList /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/add">
          { isLoggedIn ? <BookAdd /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
