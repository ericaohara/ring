import React, { useState } from "react";
import firebase from "../config/firebase";
import "../style.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  createStyles({
    root: {
      color: "#FFB549",
    },
  });
});

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const classes = useStyles();

  const onClickSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試し下さい。");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
          .then(function () {
            history.push("/");
          })
          .catch(function (err) {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="position-all">
        <div className="position-center">
          <h1>新規登録</h1>
          <form onSubmit={onClickSubmit} className={classes.root}>
            <div>
              <TextField
                required
                id="userName"
                label="ユーザー名"
                type="userName"
                id="userName"
                name="userName"
                placeholder="ユーザー名"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="Email"
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
                required
                label="パスワード"
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
            <div>
              <TextField
                required
                label="パスワード再確認用"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="password"
                style={{ marginTop: 10 }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <Button type="submit" style={{ marginTop: "30px" }}>
              アカウントを登録する
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then((result) => {
//     const user = result.user;

//     if (user) {
//       const uid = user.uid;

//       const userInitialData = {
//         uid: user.uid,
//         email: user.email,
//         username: username,
//       };

//       db.collection("users")
//         .doc(uid)
//         .set(userInitialData)
//         .then(() => {
//           history.push("/");
//         });
//     }
//   });
