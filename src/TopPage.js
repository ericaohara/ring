import React, { useState, useEffect, useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";
import firebase from "./config/firebase";
import Spinner from "./Spinner";
import TopBar from "./TopBar";

import {
  Grid,
  Image,
  Button,
  Popup,
  Responsive,
  StepGroup,
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
  const openChangeGroupModal = () => setModalChangeGroup(true);

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
          <div
            style={{
              zIndex: 10,
              position: "fixed",
              backgroundColor: "white",
            }}
          >
            <Responsive maxWidth={1030}>
              <TopBar
                modalChangeGroup={modalChangeGroup}
                setModalChangeGroup={setModalChangeGroup}
                openChangeGroupModal={openChangeGroupModal}
              />
            </Responsive>
          </div>
          <div style={{ height: 50 }} />
          <div style={{ padding: "1em", marginTop: 30 }}>
            <Grid>
              <Grid.Row>
                <div className="fixed_item">
                  <Grid.Column width={4}>
                    <Responsive minWidth={1031}>
                      <SideBar
                        modalChangeGroup={modalChangeGroup}
                        setModalChangeGroup={setModalChangeGroup}
                        openChangeGroupModal={openChangeGroupModal}
                      />
                    </Responsive>
                  </Grid.Column>
                </div>
                <Grid.Column width={9}>
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
                              .then((obj) => {
                                console.log(obj, "signOutObj");
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
        </>
      )}
    </>
  );
};

export default TopPage;
