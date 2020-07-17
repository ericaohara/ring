import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../config/firebase";
import icon from "../images/byebye_girl.png";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
  RatingIcon,
} from "semantic-ui-react";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

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
        // ユーザーのプロフィールを更新
        const user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: userName,
            email: email,
            password: password,
            photoURL: icon,
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

  // FavoriteBorderRoundedIcon

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="grey" textAlign="center">
            <Icon name="chess queen" className="signUp__color" size="mini" />
            新規登録
          </Header>
          <Form onSubmit={onClickSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                type="text"
                name="userName"
                icon="user"
                iconPosition="left"
                placeholder="ユーザー名"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <Form.Input
                fluid
                type="email"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="メールアドアレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Input
                fluid
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="パスワード"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Form.Input
                fluid
                type="password"
                name="confirmPassword"
                icon="lock"
                iconPosition="left"
                placeholder="パスワード確認用"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <Button basic fluid size="large">
                アカウントを登録する
              </Button>
            </Segment>
          </Form>
          <Message>
            アカウント登録済みの方は <Link to="/SignIn">こちら</Link>
          </Message>
        </Grid.Column>
      </Grid>
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
