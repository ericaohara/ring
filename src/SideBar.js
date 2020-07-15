import React, { useState, useContext } from "react";
import ProfileModal from "./modal/ProfileModal";
import ConfigModal from "./modal/ConfigModal";
import ChangeGroupModal from "./modal/ChangeGroupModal";
import firebase from "./config/firebase";
import { AuthContext } from "./AuthService";

import { Sidebar, Menu, Divider, Button, Grid, Popup } from "semantic-ui-react";

const SideBar = () => {
  const [modalProfile, setModalProfile] = useState(false);
  const [modalConfig, setModalConfig] = useState(false);
  const [modalChangeGroup, setModalChangeGroup] = useState(false);

  const user = useContext(AuthContext);

  // モーダル
  const openProfileModal = () => setModalProfile(true);
  const closeProfileModal = () => setModalProfile(false);

  const openConfigModal = () => setModalConfig(true);
  const closeConfigModal = () => setModalConfig(false);

  const openChangeGroupModal = () => setModalChangeGroup(true);
  const closeChangeGroupModal = () => setModalChangeGroup(false);

  // // パスワードの再設定メールを送信する
  // const auth = firebase.auth();
  // const emailAddress = user.email;

  // auth
  //   .sendPasswordResetEmail(emailAddress)
  //   .then(function () {
  //     // Email sent.
  //   })
  //   .catch(function (error) {
  //     // An error happened.
  //   });

  return (
    <>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        vertical
        visible
        width="thin"
      >
        <Divider style={{ marginBottom: 30 }} />
        <span style={{ fontSize: "50px", fontFamily: "Pacifico,cursive" }}>
          rinG
        </span>
        <Grid.Row>
          <Grid.Column style={{ marginTop: 30 }}>
            <Popup
              trigger={
                <Button
                  // プロフィール
                  circular
                  color="blue"
                  size="huge"
                  icon="user circle"
                  onClick={openProfileModal}
                />
              }
              content="プロフィール"
              basic
            />
          </Grid.Column>
          <ProfileModal modal={modalProfile} closeModal={closeProfileModal} />
          <Grid.Column style={{ marginTop: 30 }}>
            <Popup
              trigger={
                <Button
                  // グループ設定
                  circular
                  size="huge"
                  color="orange"
                  icon="sync alternate"
                  onClick={openChangeGroupModal}
                />
              }
              content="グループ設定/切替"
              basic
            />
          </Grid.Column>
          <ChangeGroupModal
            modal={modalChangeGroup}
            closeModal={closeChangeGroupModal}
          />
          <Grid.Column style={{ marginTop: 30 }}>
            <Popup
              trigger={
                <Button
                  // 設定
                  circular
                  size="huge"
                  icon="paper plane outline"
                  onClick={openConfigModal}
                />
              }
              content="報告"
              basic
            />
          </Grid.Column>
          <ConfigModal modal={modalConfig} closeModal={closeConfigModal} />
          <Grid.Column
            style={{
              marginTop: 30,
            }}
          >
            <Popup
              trigger={
                <Button
                  size="huge"
                  icon="sign-out"
                  circular
                  color="red"
                  onClick={() => firebase.auth().signOut()}
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
