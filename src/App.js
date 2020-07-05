import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TopPage from "./TopPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthService";
import LoggedInRoute from "./LoggedInRoute";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <LoggedInRoute exact path="/" component={TopPage} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/signUp" component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
