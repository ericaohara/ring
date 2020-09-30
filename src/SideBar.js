import React, { useState, useContext } from "react";
import ProfileModal from "./modal/ProfileModal";
import ChangeGroupModal from "./modal/ChangeGroupModal";
import { animateScroll as scroll } from "react-scroll";
import { CalendarApp } from "./calendar_components/CalendarApp";
import { Button, Grid, Icon, Responsive } from "semantic-ui-react";

const SideBar = ({
  modalChangeGroup,
  setModalChangeGroup,
  openChangeGroupModal,
  modalProfile,
  setModalProfile,
}) => {
  // モーダル
  const openProfileModal = () => setModalProfile(true);
  const closeProfileModal = () => setModalProfile(false);
  const closeChangeGroupModal = () => setModalChangeGroup(false);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <div>
        {/* pc */}
        <Responsive minWidth={1031}>
          <Grid>
            <Grid.Row>
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
            <Grid.Row style={{ marginTop: 50, left: 30 }}>
              <CalendarApp />
            </Grid.Row>
          </Grid>
        </Responsive>

        {/* tab */}
        <Responsive maxWidth={1030}>
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
              <div style={{ width: "100%" }}>
                <Button
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
              <div style={{ width: "100%" }}>
                <Button
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
        </Responsive>
      </div>
    </>
  );
};

export default SideBar;
