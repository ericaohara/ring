import React, { useState, useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";
import firebase from "./config/firebase";
import Spinner from "./Spinner";

import { Grid, Image, Button, Popup } from "semantic-ui-react";

const TopPage = () => {
  const { groups, user, users, currentGroup, loading, setLoading } = useContext(
    AuthContext
  );

  const [modalChangeGroup, setModalChangeGroup] = useState(false);
  const openChangeGroupModal = () => setModalChangeGroup(true);

  const pullImage = () => {
    if (user && users) {
      const conf = users.find((pull) => pull.id === user.uid);
      return conf.avatar;
    }
  };

  // データが入る順番でカレントユーザーがなくてエラーになってるかも？
  const pullName = () => {
    if (groups) {
      const conf = groups.find((group) => group.id === currentGroup);
      return conf.groupName;
    }
    // Cannot read property 'groupName' of undefined
  };

  if (!user || !users) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <SideBar
                  modalChangeGroup={modalChangeGroup}
                  setModalChangeGroup={setModalChangeGroup}
                  openChangeGroupModal={openChangeGroupModal}
                />
              </Grid.Column>
              <Grid.Column width={9}>
                {groups ? <div>{pullName()}</div> : null}
                {users ? <Image src={pullImage()} size="tiny" avatar /> : ""}
                <ChatApp />
              </Grid.Column>
              <Grid.Column width={3} className="fixed_item">
                <div className="fixed_item">
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
                              // setLoading(false);
                              console.log(obj, "signOutObj");
                              setLoading(false);
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
        </>
      )}
    </>
  );
};

export default TopPage;

// <Grid.Column>{/* <CalendarApp /> */}</Grid.Column>;
// columns = "equal";
