import React, { useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TopPage from "./TopPage";
// import { Spinner } from "./Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthService";
import LoggedInRoute from "./LoggedInRoute";

const App = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // return isLoading ? (
  //   <Spinner />
  // ) :
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={TopPage} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
