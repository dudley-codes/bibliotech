import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import BookAdd from "./book/BookAdd";
import BookDetails from "./book/BookDetails";
import BookList from "./book/BookList";
import Bookshelf from "./book/Bookshelf";
import UserLoanList from "./loan/UserLoanList";
import Login from "./Login";
import Register from "./Register";
import '../style/main.css'
import FriendsList from "./friend/FriendsList";
import BookSearch from "./book/BookSearch";

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

        <Route path="/search">
          { isLoggedIn ? <BookList /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/Bookshelf">
          { isLoggedIn ? <Bookshelf /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/book/:id" exact>
          { isLoggedIn ? <BookDetails /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/loans" exact>
          { isLoggedIn ? <UserLoanList /> : <Redirect to="/login" /> }
        </Route>

        <Route path="/friends" exact>
          { isLoggedIn ? <FriendsList /> : <Redirect to="/login" /> }
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