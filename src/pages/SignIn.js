import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

// マテリアル
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(AuthContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  const onClickSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <TextField
            required
            id="standard-required"
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            style={{ marginTop: 10 }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          size="medium"
          className={classes.margin}
          style={{ marginTop: 10 }}
          onClick={onClickSubmit}
        >
          Login
        </Button>
        <div>
          新規登録は
          <Link to="/SignUp" style={{ textDecoration: "underline" }}>
            こちら
          </Link>
        </div>
        <div>
          パスワードをお忘れの方は
          <a style={{ textDecoration: "underline" }}>こちら</a>
        </div>
      </form>
    </>
  );
};

export default SignIn;
