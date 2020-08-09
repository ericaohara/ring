import React, { useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import { CalendarApp } from "./calendar_components/CalendarApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";
import Spinner from "./Spinner";

import { Grid, Image } from "semantic-ui-react";

const TopPage = () => {
  const { groups, user, currentGroup, isLoading, setIsLoading } = useContext(
    AuthContext
  );

  if (user) {
    setIsLoading(false);
  }

  const name = () => {
    if (groups) {
      groups.map((group) => {
        if (group.groupId === currentGroup) {
          return group.groupName;
        }
      });
    }
  };

  // 関数にするとでないこれはでる
  if (groups) {
    groups.map((group) => {
      if (group.groupId === currentGroup) {
        console.log(group.groupName);
      }
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Grid columns="equal">
        <SideBar />
        <Grid.Column style={{ marginLeft: 350 }}>
          {groups && (
            <div style={{ fontFamily: "M PLUS 1p,sans-serif" }}>{name()}</div>
          )}
          {user ? <Image src={user.photoURL} avatar /> : ""}
          <ChatApp />
        </Grid.Column>
        <div className="vertical">
          <Grid.Column>
            <CalendarApp />
          </Grid.Column>
          <Grid.Column>
            <TodoApp />
          </Grid.Column>
        </div>
      </Grid>
    </>
  );
};

export default TopPage;

// style={{ position: "fixed", right: 0, top: 0 }}
