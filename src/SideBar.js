import React, { useState, useContext } from "react";
import ProfileModal from "./modal/ProfileModal";
import ChangeGroupModal from "./modal/ChangeGroupModal";
import { animateScroll as scroll } from "react-scroll";
import { CalendarApp } from "./calendar_components/CalendarApp";
import { Button, Grid, Icon } from "semantic-ui-react";

const SideBar = ({
  modalChangeGroup,
  setModalChangeGroup,
  openChangeGroupModal,
}) => {
  const [modalProfile, setModalProfile] = useState(false);
  // const [modalChangeGroup, setModalChangeGroup] = useState(false);

  // モーダル
  const openProfileModal = () => setModalProfile(true);
  const closeProfileModal = () => setModalProfile(false);

  // const openChangeGroupModal = () => setModalChangeGroup(true);
  const closeChangeGroupModal = () => setModalChangeGroup(false);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <div>
        <Grid>
          <Grid.Row style={{ marginTop: 20 }}>
            <div
              onClick={scrollToTop}
              style={{
                fontSize: "60px",
                fontFamily: "Pacifico,cursive",
                width: "100%",
                textAlign: "center",
              }}
            >
              rin<span style={{ color: "red" }}>G</span>
            </div>
          </Grid.Row>
          <Grid.Row style={{ marginTop: 50 }}>
            <div style={{ width: "100%", textAlign: "center" }}>
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
              <ProfileModal
                modal={modalProfile}
                closeModal={closeProfileModal}
              />
            </div>
          </Grid.Row>
          <Grid.Row style={{ marginTop: 30 }}>
            <div style={{ width: "100%", textAlign: "center" }}>
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
              <ChangeGroupModal
                modal={modalChangeGroup}
                closeModal={closeChangeGroupModal}
              />
            </div>
          </Grid.Row>
          <Grid.Row style={{ marginTop: 50 }}>
            <CalendarApp />
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default SideBar;
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
