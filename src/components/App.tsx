import React from "react";
import { HashRouter as Router, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { GameForm } from "./GameForm";

export const App = () => {
  return (
    <Router basename="/">
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/game/:code" component={GamePage} />
      </div>
    </Router>
  );
}

const HomePage = () => {
  const randomCode = Math.random().toString(36).slice(2);
  return (
    <Redirect to={{ pathname: `/game/${randomCode}` }} />
  );
}

const GamePage = ({ match }: RouteComponentProps<{code: string}>) => {
  return (
    <GameForm code={match.params.code} />
  );
}

