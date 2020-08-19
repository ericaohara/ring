import React, { useState, useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";
import firebase from "./config/firebase";
import { NewMemberModal } from "./modal/NewMemberModal";

import { Grid, Image, Button, Popup } from "semantic-ui-react";

const TopPage = () => {
  const { groups, user, users, currentGroup } = useContext(AuthContext);

  const [modalChangeGroup, setModalChangeGroup] = useState(false);
  const openChangeGroupModal = () => setModalChangeGroup(true);

  const pullImage = () => {
    if (user && users) {
      const conf = users.find((pull) => user.uid === pull.id);
      return conf.avatar;
    }
  };

  const pullName = () => {
    if (groups) {
      const conf = groups.find((group) => group.groupId === currentGroup);
      return conf.groupName;
    }
    // Cannot read property 'groupName' of undefined
  };

  // グループ追加を促すモーダルを出したい
  const userCheck = () => {
    if (groups.length === 0) {
      return <NewMemberModal />;
    }
  };

  return (
    <>
      {userCheck()}
      <Grid>
        <SideBar
          modalChangeGroup={modalChangeGroup}
          setModalChangeGroup={setModalChangeGroup}
          openChangeGroupModal={openChangeGroupModal}
        />
        <Grid.Column width={8} style={{ marginLeft: 350 }}>
          {groups ? <div>{pullName()}</div> : null}
          {users ? <Image src={pullImage()} size="tiny" avatar /> : ""}
          <ChatApp />
        </Grid.Column>
        <div className="vertical">
          <Grid.Column
            width={4}
            style={{ marginLeft: 50 }}
            className="fixed_item"
          >
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
          </Grid.Column>
        </div>
      </Grid>
    </>
  );
};

export default TopPage;

// <Grid.Column>{/* <CalendarApp /> */}</Grid.Column>;
// columns = "equal";
