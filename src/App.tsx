import React from "react";
import { HashRouter as Router, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { GameForm } from "./components/GameForm";

function BasicExample() {
  return (
    <Router basename="/">
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/game/:code" component={Child} />
      </div>
    </Router>
  );
}

function Home() {
  const randomCode = Math.random().toString(36).slice(2);
  return (
    <Redirect to={{ pathname: `/game/${randomCode}` }} />
  );
}

function Child({ match }: RouteComponentProps<{code: string}>) {
  return (
    <GameForm code={match.params.code} />
  );
}

export default BasicExample;
