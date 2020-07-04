import React from "react";
import Login from "./pages/Login";
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
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
