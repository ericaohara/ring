import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Modal,
  Input,
} from "semantic-ui-react";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [emailSubmit, setEmailSubmit] = useState(false);
  const user = useContext(AuthContext);

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

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const resetPassword = (value) => {
    const auth = firebase.auth();
    const emailAddress = value;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        console.log("パスワードリセット");
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="grey" textAlign="center">
            <Icon name="lightbulb outline" className="signIn__color" />
            ログイン
          </Header>
          <Form>
            <Segment stacked>
              <Form.Input
                fluid
                type="email"
                icon="mail"
                iconPosition="left"
                name="email"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Input
                fluid
                type="password"
                icon="lock open"
                iconPosition="left"
                name="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                basic
                variant="contained"
                size="medium"
                style={{ marginTop: 10 }}
                onClick={onClickSubmit}
              >
                ログイン
              </Button>
            </Segment>
          </Form>
          <Message>
            新規登録は
            <Link to="/SignUp">こちら</Link>
          </Message>
          <Message>
            パスワードをお忘れの方は
            <Button basic onClick={openModal}>
              こちら
            </Button>
          </Message>
        </Grid.Column>
      </Grid>
      <Modal open={modal} onClose={closeModal}>
        <Modal.Header>パスワード再設定</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={() => {
              resetPassword(emailSubmit);
            }}
          >
            <label>アドレスを入力</label>
            <Input
              type="email"
              value={emailSubmit}
              onChange={(e) => {
                setEmailSubmit(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                resetPassword(emailSubmit);
              }}
            >
              送信
            </Button>
            <Button onClick={closeModal}>キャンセル</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SignIn;
