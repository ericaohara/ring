import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
// import { connect } from "react-redux";
// import { isLoading } from "./actions";

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
  const [reset, setReset] = useState("");
  const { user } = useContext(AuthContext);

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("メールアドレスを入力してください");
    }
    if (!password) {
      alert("パスワードを入力してください");
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
        console.log("ログイン成功");
      })
      .catch((err) => {
        console.log(err, "signin");
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
        alert("メールを送信しました！そちらから変更してください！");
        console.log("パスワードリセット");
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!user ? (
        <Spinner />
      ) : (
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
                <div onClick={openModal} style={{ color: "blue" }}>
                  こちら
                </div>
              </Message>
            </Grid.Column>
          </Grid>
          <Modal open={modal} onClose={closeModal}>
            <Modal.Header>パスワード再設定</Modal.Header>
            <Modal.Content>
              <Form
                onSubmit={() => {
                  resetPassword(reset);
                }}
              >
                <label>アドレスを入力</label>
                <Input
                  type="email"
                  value={reset}
                  onChange={(e) => {
                    setReset(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    resetPassword(reset);
                  }}
                >
                  送信
                </Button>
                <Button onClick={closeModal}>キャンセル</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </>
      )}
    </>
  );
};

// const mapStateTopProps = (state) => {
//   return { loading: state.loading };
// };

export default SignIn;
// export default connect(mapStateTopProps, { isLoading })(SignIn);
