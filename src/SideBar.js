import React, { useState, useContext } from "react";
import ProfileModal from "./modal/ProfileModal";
import ConfigModal from "./modal/ConfigModal";
import ChangeGroupModal from "./modal/ChangeGroupModal";
import firebase from "./config/firebase";
import { AuthContext } from "./AuthService";

import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Grid,
  Popup,
  Icon,
} from "semantic-ui-react";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [modalProfile, setModalProfile] = useState(false);
  const [modalConfig, setModalConfig] = useState(false);
  const [modalChangeGroup, setModalChangeGroup] = useState(false);

  // モーダル
  const openProfileModal = () => setModalProfile(true);
  const closeProfileModal = () => setModalProfile(false);

  const openConfigModal = () => setModalConfig(true);
  const closeConfigModal = () => setModalConfig(false);

  const openChangeGroupModal = () => setModalChangeGroup(true);
  const closeChangeGroupModal = () => setModalChangeGroup(false);

  return (
    <>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        vertical
        visible
        width="wide"
      >
        <Divider style={{ marginBottom: 50 }} />
        <span style={{ fontSize: "80px", fontFamily: "Pacifico,cursive" }}>
          rin<span style={{ color: "red" }}>G</span>
        </span>
        <Grid.Row>
          <Grid.Column style={{ marginTop: 80 }}>
            <Popup
              trigger={
                <Button
                  // プロフィール
                  circular
                  color="blue"
                  size="big"
                  onClick={openProfileModal}
                  inverted
                >
                  <Icon name="user circle" /> プロフィール
                </Button>
              }
              content="プロフィール"
              basic
            />
          </Grid.Column>
          <ProfileModal modal={modalProfile} closeModal={closeProfileModal} />
          <Grid.Column style={{ marginTop: 40 }}>
            <Popup
              trigger={
                <Button
                  // グループ設定
                  circular
                  size="big"
                  color="orange"
                  onClick={openChangeGroupModal}
                  inverted
                >
                  <Icon name="sync alternate" />
                  グループ設定
                </Button>
              }
              content="グループ設定"
              basic
            />
          </Grid.Column>
          <ChangeGroupModal
            modal={modalChangeGroup}
            closeModal={closeChangeGroupModal}
          />
          <Grid.Column style={{ marginTop: 40 }}>
            <Popup
              trigger={
                <Button
                  // 問合せ
                  circular
                  size="big"
                  icon="paper plane outline"
                  onClick={openConfigModal}
                  inverted
                  color="olive"
                >
                  <Icon name="paper plane outline" />
                  お問合せ
                </Button>
              }
              content="お問合せ"
              basic
            />
          </Grid.Column>
          <ConfigModal modal={modalConfig} closeModal={closeConfigModal} />
          <Grid.Column
            style={{
              marginTop: 40,
            }}
          >
            <Popup
              trigger={
                <Button
                  size="huge"
                  icon="sign-out"
                  circular
                  color="red"
                  inverted
                  onClick={() => {
                    firebase
                      .auth()
                      .signOut()
                      .then((obj) => {
                        console.log(obj, "signOutObj");
                      })
                      .catch((err) => {
                        console.log(err, "signOutErr");
                      });
                    // ログイン状態の監視
                    // ログイン状態が変わったらコールバックが発火してログアウトしてしまう
                    // firebase.auth().onAuthStateChanged((firebaseUser) => {
                    //   firebase
                    //     .auth()
                    //     .signOut()
                    //     .then(() => {
                    //       console.log("ログアウト");
                    //     });
                    // });
                  }}
                />
              }
              content="ログアウト"
              basic
            />
          </Grid.Column>
        </Grid.Row>
      </Sidebar>
    </>
  );
};

export default SideBar;
// firebase
//   .auth()
//   .signOut()
//   .then((obj) => {
//     console.log(obj, "signOutObj");
//   })
//   .catch((err) => {
//     console.log(err, "signOutErr");
//   });
