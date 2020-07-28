import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../config/firebase";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  const db = firebase.firestore();

  const onClickSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試し下さい。");
      return;
    }

    firebase
      .auth()
      // emailとpasswordを元にユーザーを作る
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // ユーザーのプロフィールを更新
        // createUserWithEmailAndPasswordの返り値
        const user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: userName,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/ring-6c2f7.appspot.com/o/avatar%2Fanimal_chara_bad4_neko.png?alt=media&token=783201be-929d-44f4-8841-78d2d4d40733",
          })
          .then(() => {
            // firestoreにuser情報を追加
            db.collection("users").doc(user.uid).set({
              name: user.displayName,
              avatar: user.photoURL,
              birth: "",
              groups: [],
            });
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          {/* <input type="file" onChange={choiceAvatar} />
          <button onClick={prevAvatar}>画像</button> */}
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
