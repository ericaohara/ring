import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TopPage from "./TopPage";
// import { Spinner } from "./Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthService";
import LoggedInRoute from "./LoggedInRoute";

// const { isLoading } = useContext(AuthContext);
// return isLoading ? (
//   <Spinner />
// ) : (

const App = () => {
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
