import React, { useState, useContext } from "react";
import firebase from "./config/firebase";
import { AuthContext } from "./AuthService";

import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Grid,
} from "semantic-ui-react";

const SideBar = () => {
  // const [openProfile, setOpenProfile] = useState(false);
  // const [openConfig, setOpenConfig] = useState(false);
  // const [openChangeGroup, setOpenChangeGroup] = useState(false);
  const user = useContext(AuthContext);

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const profile = () => {
    return (
      <>
        <Modal open={modal} onClose={closeModal}>
          <Modal.Header>プロフィール</Modal.Header>
          <Modal.Content>
            <Label content="Primary Color" />
            <Label content="Secondary Color" />
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" />
              　保存
            </Button>
            <Button color="red" inverted onClick={closeModal}>
              <Icon name="remove" />
              　キャンセル
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  };

  // パスワードの再設定メールを送信する
  const auth = firebase.auth();
  const emailAddress = user.email;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });

  return (
    <>
      {/* <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" style={{ fontFamily: "PMingLiU" }}>
          rinG
        </Typography>

        <div style={{ paddingLeft: 150 }}>
          <div>
            <Button onClick={profileOpen}>
              <Icon className="far fa-user" />
              　プロフィール
            </Button>
            <Dialog
              open={openProfile}
              onClose={profileClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                プロフィール編集
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField label={user.displayName} type="text" />
                </DialogContentText>
                <Button id="alert-dialog-description">アイコン変更</Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={profileClose} color="primary">
                  戻る
                </Button>
                <Button onClick={profileClose} color="primary">
                  決定
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <Button onClick={configOpen}>
            <Icon className="fa fa-tools" />
            　設定
          </Button>
          <Dialog
            open={openConfig}
            onClose={configClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">設定</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField label="メンバーを招待" type="text" />
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField label="メールアドレス変更" type="text" />
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField label="パスワード変更" type="text" />
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField label="グループ名変更" type="text" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={configClose} color="primary">
                戻る
              </Button>
              <Button onClick={configClose} color="primary" autoFocus>
                決定
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            style={{ color: "red" }}
            onClick={() => firebase.auth().signOut()}
          >
            ログアウト
          </Button>
        </div>
      </Toolbar> */}
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        vertical
        visible
        width="thin"
      >
        <Divider style={{ marginBottom: 30 }} />
        <span style={{ fontSize: "50px", fontFamily: "Fredoka One" }}>
          rinG
        </span>
        <Grid.Row>
          <Grid.Column style={{ marginTop: 30 }}>
            <Button
              circular
              color="blue"
              size="huge"
              icon="user circle"
              onClick={profile()}
            />
          </Grid.Column>
          <Grid.Column style={{ marginTop: 30 }}>
            <Button
              circular
              size="huge"
              color="orange"
              icon="sync alternate"
              onClick={openModal}
            />
          </Grid.Column>
          <Grid.Column style={{ marginTop: 30 }}>
            <Button circular size="huge" icon="cog" onClick={openModal} />
          </Grid.Column>
          <Grid.Column
            style={{
              marginTop: 30,
            }}
          >
            <Button
              size="huge"
              icon="sign-out"
              circular
              color="red"
              onClick={() => firebase.auth().signOut()}
            />
          </Grid.Column>
        </Grid.Row>
      </Sidebar>
    </>
  );
};

export default SideBar;
