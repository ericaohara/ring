import React, { useContext } from "react";
import TodoApp from "./todo_components/TodoApp";
import { CalendarApp } from "./calendar_components/CalendarApp";
import ChatApp from "./chat_components/ChatApp";
import SideBar from "./SideBar";
import { AuthContext } from "./AuthService";

import { Grid, Image } from "semantic-ui-react";

const TopPage = () => {
  const { groups, user, users, currentGroup } = useContext(AuthContext);

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
  };

  return (
    <>
      <Grid columns="equal">
        <SideBar />
        <Grid.Column style={{ marginLeft: 350 }}>
          {groups && (
            <div style={{ fontFamily: "M PLUS 1p,sans-serif" }}>
              {pullName()}
            </div>
          )}
          {users ? <Image src={pullImage()} avatar /> : ""}
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
