import React, { useState, useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";
import firebase from "./config/firebase";
import Spinner from "./Spinner";
import TopBar from "./TopBar";
import ChangeGroupModal from "./modal/ChangeGroupModal";
import ProfileModal from "./modal/ProfileModal";
import TodoModal from "./modal/TodoModal";

import {
  Grid,
  Button,
  Popup,
  Responsive,
  Sidebar,
  Segment,
  Menu,
  Icon,
} from "semantic-ui-react";

const TopPage = () => {
  const {
    groups,
    setGroups,
    user,
    users,
    currentGroup,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const [modalChangeGroup, setModalChangeGroup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [modalTodo, setModalTodo] = useState(false);
  const openProfileModal = () => setModalProfile(true);
  const closeProfileModal = () => setModalProfile(false);
  const openTodoModal = () => setModalTodo(true);
  const closeTodoModal = () => setModalTodo(false);

  const openChangeGroupModal = () => setModalChangeGroup(true);
  const openHamburger = () => setVisible(!visible);
  const closeChangeGroupModal = () => setModalChangeGroup(false);

  const pullName = () => {
    if (currentGroup && groups) {
      const conf = groups.find((group) => group.id === currentGroup);
      return conf.groupName;
    }
  };

  if (user || users) {
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* pc */}
          <Responsive {...Responsive.onlyComputer}>
            <div style={{ padding: "1em", marginTop: 30 }}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <div style={{ position: "fixed", width: "25%" }}>
                      <SideBar
                        modalChangeGroup={modalChangeGroup}
                        setModalChangeGroup={setModalChangeGroup}
                        openChangeGroupModal={openChangeGroupModal}
                        modalProfile={modalProfile}
                        setModalProfile={setModalProfile}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <div>{pullName()}</div>
                    <ChatApp />
                  </Grid.Column>
                  <Grid.Column width={3} className="fixed_item">
                    <div style={{ position: "fixed" }}>
                      <TodoApp />
                      <Popup
                        trigger={
                          <Button
                            size="huge"
                            icon="sign-out"
                            circular
                            color="red"
                            inverted
                            className="fixed_btn"
                            onClick={() => {
                              firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                  setLoading(false);
                                  setGroups(null);
                                })
                                .catch((err) => {
                                  console.log(err, "signOutErr");
                                });
                            }}
                          />
                        }
                        content="ログアウト"
                        basic
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Responsive>

          {/* tab */}
          <Responsive {...Responsive.onlyTablet}>
            <div>
              <div
                style={{
                  zIndex: 10,
                  backgroundColor: "white",
                  position: "fixed",
                  top: 0,
                  width: "100%",
                }}
              >
                <TopBar
                  modalChangeGroup={modalChangeGroup}
                  setModalChangeGroup={setModalChangeGroup}
                  openChangeGroupModal={openChangeGroupModal}
                />
              </div>
              <div style={{ padding: "1em", marginTop: 30 }}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={9}>
                      <div style={{ marginTop: 80 }}>{pullName()}</div>
                      <ChatApp />
                    </Grid.Column>
                    <Grid.Column width={3} className="fixed_item">
                      <div style={{ position: "fixed" }}>
                        <TodoApp />
                        <Popup
                          trigger={
                            <Button
                              size="huge"
                              icon="sign-out"
                              circular
                              color="red"
                              inverted
                              className="fixed_btn"
                              onClick={() => {
                                firebase
                                  .auth()
                                  .signOut()
                                  .then(() => {
                                    setLoading(false);
                                    setGroups(null);
                                  })
                                  .catch((err) => {
                                    console.log(err, "signOutErr");
                                  });
                              }}
                            />
                          }
                          content="ログアウト"
                          basic
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </Responsive>

          {/* sp */}
          <Responsive {...Responsive.onlyMobile}>
            <div>
              <div
                style={{
                  zIndex: 10,
                  backgroundColor: "white",
                  position: "fixed",
                  top: 0,
                  width: "100%",
                }}
              >
                <TopBar
                  modalChangeGroup={modalChangeGroup}
                  setModalChangeGroup={setModalChangeGroup}
                  openChangeGroupModal={openChangeGroupModal}
                  visible={visible}
                  openHamburger={openHamburger}
                />
              </div>
              {/* humbargerMenu */}
              <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                  <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                    width="thin"
                    direction="right"
                    style={{ top: 70 }}
                  >
                    <Menu.Item as="a" onClick={openTodoModal}>
                      <Icon name="list" />
                      TODO
                    </Menu.Item>
                    <TodoModal modal={modalTodo} closeModal={closeTodoModal} />
                    <Menu.Item as="a" onClick={openProfileModal}>
                      <Icon name="user circle" />
                      profile
                    </Menu.Item>
                    <ProfileModal
                      modal={modalProfile}
                      closeModal={closeProfileModal}
                    />
                    <Menu.Item as="a" onClick={openChangeGroupModal}>
                      <Icon name="sync alternate" />
                      group
                    </Menu.Item>
                    <ChangeGroupModal
                      modal={modalChangeGroup}
                      closeModal={closeChangeGroupModal}
                    />
                    <Menu.Item
                      as="a"
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            setLoading(false);
                            setGroups(null);
                          })
                          .catch((err) => {
                            console.log(err, "signOutErr");
                          });
                      }}
                    >
                      <Icon name="sign-out" />
                      logout
                    </Menu.Item>
                  </Sidebar>

                  <Sidebar.Pusher>
                    <div style={{ padding: "5px" }}>
                      <Grid>
                        <Grid.Column style={{ width: "100%", marginTop: 80 }}>
                          <div>{pullName()}</div>
                          <ChatApp />
                        </Grid.Column>
                      </Grid>
                    </div>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </Grid.Column>
            </div>
          </Responsive>
        </>
      )}
    </>
  );
};

export default TopPage;
